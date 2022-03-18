const translate = require('@vitalets/google-translate-api');

module.exports = async(text, to = 'en', from = null) => {
    const res = await translate(text, { from: from, to: to });
    let autoCorrectResult = null;
    if (res.from.text.didYouMean || res.from.text.autoCorrected)
        autoCorrectResult = res.from.text.value.replace(/\[([a-z]+)\]/ig, '$1');

    return {
        language: res.from.language.iso,
        text: res.text,
        didAutoCorrect: autoCorrectResult !== null,
        autoCorrectResult: autoCorrectResult
    };
};
