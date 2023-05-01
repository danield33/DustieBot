const Encodes = { "0": "%M%*", "1": "¨LS¨", "2": "NUIS", "3": "mqoM", "4": "6S8n", "5": "_2°0", "6": "£%MQ", "7": "SHUI", "8": "2678", "9": "*Q%L", "a": "HDBK", "b": "PAKD", "c": "PMAL", "d": "BQYA", "e": "FD?Q", "f": "LDNJ", "g": "AUSN", "h": "NDKQ", "i": "URKN", "j": "^SKS", "k": "*J4N", "l": "BXJS", "m": "PS*Q", "n": "+=QA", "o": "BISZ", "p": "£BHA", "q": "2672", "r": "#B@M", "s": "<Lo>", "t": "ùEK%", "u": "*Z(P", "v": "$r£l", "w": "%^PO", "x": "H3à°", "y": "%£KN", "z": "JZIO", "A": "Z¨PL", "B": "389O", "C": "2°_2", "D": "£2%M", "E": "2)21", "F": "%¨*A", "G": "NJIO", "H": "Y821", "I": "#nk@", "J": "_°¨&", "K": "%£:@", "L": "OP3S", "M": "2°0O", "N": "/%W#", "O": "7389", "P": "U9OS", "Q": "_*£M", "R": "#VGY", "S": ",doà", "T": "+%Z¨", "U": "°0OL", "V": "?2P<", "W": ">,ro", "X": "_3¨2", "Y": "2°3`", "Z": "_2°¨", " ": "%¨$z", "!": "NJQI", "@": "fnjd", "#": "?S0Q", "&": "_2°0", "é": "£%QM", "'": "*Q%+", '"': "+/.M", "(": "bjdk", "§": "*£Q%", "è": "£%ML", "ç": "+.M%", "à": "*%ML", ")": "¨Z%M", "-": "_SPL", "_": ">;rm", "^": "*¨PK", "¨": "ZMSL", "$": "BSui", "*": "M?QP", "€": "DOQP", "%": "SNJI", "ù": "+/.L", "£": "S)&é", "`": "sf4Y", "=": "$`mp", "+": "M93`", ":": "*Z¨P", "/": "S?Lz", ";": "_0SL", ".": "M+P.", ",": "¨LZ$", "?": "¨P_u", "<": "B9°£", ">": "£S%¨" }





module.exports.encode = (str) => {
    let newStr = str.split("")
    let encoded = []
    for (var i = 0; newStr.length > i; i++) {
        let enc = Encodes[newStr[i]]
        encoded.push(enc)
    }
    return encoded.join('')
}

module.exports.decode = (str) => {
    let encodes = []
    let charLength = str.split("").length / 4
    for (var i = 0; charLength > i; i++) {
        let encodeGroup = str.substring(0, 4)
        str = str.substring(4)
        encodes.push(encodeGroup)
    }

    let letters = []
    encodes.forEach(encode => {
        let letter = getKeyByValue(Encodes, encode)
        letters.push(letter)
    })
    return letters.join('')
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}