module.exports = function () {

    /**
     * Pads a number.
     * Reference: http://stackoverflow.com/a/10632399/3681727
     */
    Number.prototype.padLeft = function (base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };

    /**
     * Gets the date in the DateTime format.
     * Reference: http://stackoverflow.com/a/10632399/3681727
     * @returns {string}
     */
    Date.prototype.stringDate = function () {
        var d = new Date();

        return [d.getFullYear(),
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft()].join('/');
    };

    Date.prototype.getDateTimeFormat = function () {
        var d = new Date();

        return [(d.getMonth() + 1).padLeft(),
                d.getDate().padLeft(),
                d.getFullYear()].join('-') +
            ' ' +
            [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');
    };

    return '';
};
