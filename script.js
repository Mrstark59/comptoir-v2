// Charge les 3 derniers articles pour la page d'accueil
async function loadHomeHighlights() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .limit(3);

  if (error) return console.error(error);
  console.log("Articles accueil :", data);
}
