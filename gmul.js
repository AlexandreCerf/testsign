// AES - Opérations sur GF(256)

// Addition et soustraction : un simple XOR
function gadd(a, b) {
  return a ^ b;
}

const gsub = gadd;

// Multiplication dans GF(256)
function gmul(a, b) {
  // On met le produit à zéro
  let p = 0;

  // On boucle 8 fois (un tour par bit de b)
  for (let i = 0; i < 8; i++) {
    // Si le bit de poids faible de b est à 1, on XOR p avec a
    if (b & 1) {
      p ^= a;
    }

    // On retient si le bit de poids fort de a est à 1
    const hautBit = a & 0x80;

    // On décale a d'un bit vers la gauche, en jetant le bit de poids fort
    // (le & 0xff garde seulement 8 bits, le bit de poids faible devient 0)
    a = (a << 1) & 0xff;

    // Si le bit de poids fort était à 1 avant le décalage, on XOR a avec 0x1b
    if (hautBit) {
      a ^= 0x1b;
    }

    // On décale b d'un bit vers la droite, en jetant le bit de poids faible
    // (le bit de poids fort devient 0)
    b >>= 1;
  }

  // p contient maintenant le produit de a et b
  return p;
}

const hex = (n) => "0x" + n.toString(16).padStart(2, "0");

// Exemples connus (FIPS-197) : 0x57 * 0x83 = 0xc1 et 0x57 * 0x13 = 0xfe
console.log(hex(gmul(0x57, 0x83)));
console.log(hex(gmul(0x57, 0x13)));
console.log(hex(gadd(0x57, 0x83)));