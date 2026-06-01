using concessionnaireVoituesGrA.Domains;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace concessionnaireVoituesGrA.Services
{
    /// <summary>
    /// Génère une facture PDF simple (noir et blanc) via QuestPDF.
    /// Prix en Dirham Marocain (MAD).
    /// </summary>
    public class FacturePdfService
    {
        private static string Mad(double v) => $"{v:N2} MAD";
        private static string Date(DateTime d) => d.ToString("dd/MM/yyyy");

        public byte[] Generer(Facture facture)
        {
            return Document.Create(doc =>
            {
                doc.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(50);
                    page.DefaultTextStyle(s => s.FontFamily("Arial").FontSize(10));

                    // ── EN-TÊTE ───────────────────────────────────────────────
                    page.Header().Column(hdr =>
                    {
                        hdr.Item().Row(row =>
                        {
                            row.RelativeItem().Column(c =>
                            {
                                c.Item().Text("GrA Motors").FontSize(20).Bold();
                                c.Item().Text("Casablanca, Maroc").FontSize(9);
                                c.Item().Text("contact@gramotors.ma").FontSize(9);
                            });

                            row.ConstantItem(180).Column(c =>
                            {
                                c.Item().Text($"FACTURE N° {facture.IdLocation:D5}")
                                    .FontSize(16).Bold();
                                c.Item().PaddingTop(4)
                                    .Text($"Date : {Date(facture.DateCreation)}")
                                    .FontSize(9);
                            });
                        });

                        hdr.Item().PaddingTop(12).LineHorizontal(1);
                    });

                    // ── CORPS ─────────────────────────────────────────────────
                    page.Content().PaddingTop(20).Column(col =>
                    {
                        // ─ Client ─────────────────────────────────────────────
                        col.Item().Text("CLIENT").Bold().FontSize(9);
                        col.Item().PaddingTop(4).Table(t =>
                        {
                            t.ColumnsDefinition(c =>
                            {
                                c.ConstantColumn(100);
                                c.RelativeColumn();
                            });

                            void Ligne(string label, string valeur)
                            {
                                t.Cell().PaddingVertical(2).Text(label).FontColor("#555555");
                                t.Cell().PaddingVertical(2).Text(valeur);
                            }

                            Ligne("Nom",     $"{facture.ClientPrenom} {facture.ClientNom}");
                            Ligne("CIN",      facture.ClientCINE);
                            if (!string.IsNullOrWhiteSpace(facture.ClientTel))
                                Ligne("Téléphone", facture.ClientTel);
                            if (!string.IsNullOrWhiteSpace(facture.ClientAdresse))
                                Ligne("Adresse",   facture.ClientAdresse);
                        });

                        col.Item().PaddingTop(16).LineHorizontal(0.5f).LineColor("#cccccc");

                        // ─ Véhicule ───────────────────────────────────────────
                        col.Item().PaddingTop(12).Text("VÉHICULE").Bold().FontSize(9);
                        col.Item().PaddingTop(4).Table(t =>
                        {
                            t.ColumnsDefinition(c =>
                            {
                                c.ConstantColumn(100);
                                c.RelativeColumn();
                            });

                            void Ligne(string label, string valeur)
                            {
                                t.Cell().PaddingVertical(2).Text(label).FontColor("#555555");
                                t.Cell().PaddingVertical(2).Text(valeur);
                            }

                            Ligne("Véhicule",   $"{facture.Marque} {facture.Modele}");
                            Ligne("Matricule",   facture.Matricule);
                            Ligne("Année",       facture.Annee.ToString());
                            Ligne("Tarif / jour", Mad(facture.PrixParJour));
                        });

                        col.Item().PaddingTop(16).LineHorizontal(0.5f).LineColor("#cccccc");

                        // ─ Détails de location ────────────────────────────────
                        col.Item().PaddingTop(12).Text("DÉTAILS DE LA LOCATION").Bold().FontSize(9);
                        col.Item().PaddingTop(6).Table(table =>
                        {
                            table.ColumnsDefinition(c =>
                            {
                                c.RelativeColumn(); // Date début
                                c.RelativeColumn(); // Date fin
                                c.ConstantColumn(50); // Jours
                                c.RelativeColumn(); // Prix/jour
                                c.RelativeColumn(); // Total
                            });

                            // En-têtes
                            void Entete(string txt)
                            {
                                table.Cell()
                                    .BorderBottom(1)
                                    .PaddingVertical(5).PaddingHorizontal(4)
                                    .Text(txt).Bold().FontSize(8);
                            }

                            Entete("Date début");
                            Entete("Date fin");
                            Entete("Jours");
                            Entete("Prix / jour");
                            Entete("Total");

                            // Données
                            void Cellule(string txt, bool gras = false)
                            {
                                var cell = table.Cell()
                                    .BorderBottom(1).BorderColor("#dddddd")
                                    .PaddingVertical(6).PaddingHorizontal(4);

                                if (gras)
                                    cell.Text(txt).Bold();
                                else
                                    cell.Text(txt);
                            }

                            Cellule(Date(facture.DateDebut));
                            Cellule(Date(facture.DateFin));
                            Cellule(facture.NombreJours.ToString());
                            Cellule(Mad(facture.PrixParJour));
                            Cellule(Mad(facture.PrixTotal), gras: true);
                        });

                        // ─ Montant total ──────────────────────────────────────
                        col.Item().PaddingTop(20).Row(row =>
                        {
                            row.RelativeItem(); // spacer

                            row.ConstantItem(230).Column(c =>
                            {
                                c.Item().LineHorizontal(1);
                                c.Item().PaddingTop(8).Row(r =>
                                {
                                    r.RelativeItem().Text("MONTANT TOTAL TTC").Bold();
                                    r.AutoItem().Text(Mad(facture.PrixTotal)).Bold().FontSize(12);
                                });
                                c.Item().PaddingTop(4).LineHorizontal(1);
                            });
                        });

                        // ─ Note ───────────────────────────────────────────────
                        col.Item().PaddingTop(30).LineHorizontal(0.5f).LineColor("#cccccc");
                        col.Item().PaddingTop(8)
                            .Text("Ce document tient lieu de facture officielle. Merci de votre confiance.")
                            .FontSize(8).FontColor("#888888").Italic();
                    });

                    // ── PIED DE PAGE ──────────────────────────────────────────
                    page.Footer().AlignCenter().Text(t =>
                    {
                        t.Span("GrA Motors — Page ").FontSize(7).FontColor("#aaaaaa");
                        t.CurrentPageNumber().FontSize(7).FontColor("#aaaaaa");
                        t.Span(" / ").FontSize(7).FontColor("#aaaaaa");
                        t.TotalPages().FontSize(7).FontColor("#aaaaaa");
                    });
                });
            }).GeneratePdf();
        }
    }
}
