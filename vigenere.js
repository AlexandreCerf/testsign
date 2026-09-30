const MIN = 32;
const TAILLE = 95;

function vigenere(texte, cle, sens) {
  let resultat = "";
  for (let i = 0; i < texte.length; i++) {
    const c = texte.charCodeAt(i) - MIN;
    const k = cle.charCodeAt(i % cle.length) - MIN;
    const n = (c + sens * k + TAILLE) % TAILLE;
    resultat += String.fromCharCode(n + MIN);
  }
  return resultat;
}

const chiffrer = (texte, cle) => vigenere(texte, cle, 1);
const dechiffrer = (texte, cle) => vigenere(texte, cle, -1);

const message = "oh non yuki non gros";
const cle = "feurcringeratio";

const chiffre = chiffrer(message, cle);
console.log(chiffre);
console.log(dechiffrer(chiffre, cle));
