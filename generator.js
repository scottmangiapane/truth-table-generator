function build() {
    var i, j;
    var text = $("#expression").val().toUpperCase().replace(new RegExp(' ', 'g'), "");
    while (numOf('(', text) > numOf(')', text))
        text += ")";

    var variables = [];
    for (i = 0; i < text.length; i++)
        if ((text.charAt(i) >= 'A' && text.charAt(i) <= 'Z'))
            if (text.indexOf(text.charAt(i)) == i)
                variables.push(text.charAt(i));
    variables.sort();

    var string = "";
    string += "<tr>";
    for (i = 0; i < variables.length; i++)
        string += "<th>" + variables[i] + "</th>";
    string += "<th>" + text + "</th></tr>";
    for (i = 0; i < Math.pow(2, variables.length); i++) {
        string += "<tr>";
        var data = [];
        for (j = 0; j < variables.length; j++) {
            data[j] = 1 - Math.floor(i / Math.pow(2, variables.length - j - 1)) % 2;
            string += "<td>" + data[j] + "</td>";
        }
        var equation = text;
        for (i = 0; i < variables.length; i++)
            equation = equation.replace(new RegExp(variables[i], 'g'), data[i]);
        string += "<td>" + '-' + "</td><td>" + solve(equation) + "</td></tr>";
    }

    string = "<table align='center' id='table-placeholder'>" + string + "</table>";
    $("#table-placeholder").replaceWith(string);

    function solve(text) {
        var i;
        return text;
    }
}

/*
 TEST CASE
 A((B+~C)(A+C))
 */