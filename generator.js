function build() {
    var text = $("#expression").val();
    var values = [];
    for (var i = 0; i < text.length; i++)
        if ((text.charAt(i) >= 'A' && text.charAt(i) <= 'Z') || (text.charAt(i) >= 'a' && text.charAt(i) <= 'z'))
            if (text.indexOf(text.charAt(i)) == i)
                values.push(text.charAt(i).toUpperCase());
    values.sort();

    var string = "";
    string = "<tr><th><p>" + values + "</p></th></tr>";
    var values = new Array(10);
    $("#table-placeholder").replaceWith("<table id='table-placeholder'>" + string + "</table>");
}