const alphaticOnly = /[^a-zA-Z\s]/g

// Récupére le contenu alphabétique d'une string
export function alphaticOnlyMethod(chaine) {
    return chaine.replace(alphaticOnly, '');
}