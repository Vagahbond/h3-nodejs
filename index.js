const underscorize = (chaine) => {
    if (!chaine) {
        throw new Error('chaine is not defined');
    }
    return chaine.split(' ').join('_');
}


let chaine = '';

try {
    chaine = underscorize(chaine);
} catch (e) {
    console.error(e);
}

