function build() {
    var i, j;
    var placeholder = document.getElementById("table-placeholder");
    var text = (document.getElementById("expression")).value;
    if (text == "") {
        placeholder.innerHTML = "<div id='table-placeholder'></div>";
        return;
    }
    if (text.match(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01+*'() ]/g) != null) {
        placeholder.innerHTML = "<p id='table-placeholder'>One of the characters is not allowed.</p>";
        return;
    }
    text = format(text);
    var variables = [];
    for (i = 0; i < text.length; i++) {
        if ((text[i] >= 'A' && text[i] <= 'Z')) {
            if (text.indexOf(text[i]) == i) {
                variables.push(text[i]);
            }
        }
    }
    variables.sort();
    if (variables.length > 8) {
        placeholder.innerHTML = "<p id='table-placeholder'>You can only have 8 variables at a time.</p>";
        return;
    }
    var string = "";
    string += "<tr>";
    for (i = 0; i < variables.length; i++) {
        string += "<th>" + variables[i] + "</th>";
    }
    string += "<th>" + text + "</th></tr>";
    for (i = 0; i < Math.pow(2, variables.length); i++) {
        string += "<tr>";
        var data = [];
        for (j = 0; j < variables.length; j++) {
            data[j] = Math.floor(i / Math.pow(2, variables.length - j - 1)) % 2;
            string += "<td>" + data[j] + "</td>";
        }
        var equation = text;
        for (j = 0; j < variables.length; j++) {
            equation = equation.replace(new RegExp(variables[j], 'g'), data[j]);
        }
        // string += "<td>" + '-' + "</td>";
        string += "<td>" + solve(equation) + "</td></tr>";
    }
    string = "<table align='center' id='table-placeholder'>" + string + "</table>";
    if (string.indexOf("<td></td>") == -1)
        placeholder.innerHTML = string;
    else
        placeholder.innerHTML = "<p id='table-placeholder'>Invalid expression.</p>";

    function format(text) {
        text = text.replace(/ /g, '');
        text = text.toUpperCase();
        while (numOf(text, '(') > numOf(text, ')'))
            text += ")";
        return text;
    }

    function numOf(text, search) {
        var count = 0;
        for (var i = 0; i < text.length; i++)
            if (text[i] == search)
                count++;
        return count;
    }

    function solve(equation) {
        while (equation.indexOf("(") != -1) {
            var start = equation.lastIndexOf("(");
            var end = equation.indexOf(")", start);
            if (start != -1)
                equation = equation.substring(0, start)
                    + solve(equation.substring(start + 1, end))
                    + equation.substring(end + 1);
        }
        equation = equation.replace(/''/g, '');
        equation = equation.replace(/0'/g, '1');
        equation = equation.replace(/1'/g, '0');
        for (var i = 0; i < equation.length - 1; i++)
            if ((equation[i] == '0' || equation[i] == '1') && (equation[i + 1] == '0' || equation[i + 1] == '1'))
                equation = equation.substring(0, i + 1) + '*' + equation.substring(i + 1, equation.length);
        try {
            var safeEval = eval;
            var answer = safeEval(equation);
            if (answer == 0)
                return 0;
            if (answer > 0)
                return 1;
            return '';
        } catch (e) {
            return '';
        }
    }
}