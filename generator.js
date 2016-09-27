function build() {
    var i, j;
    var text = $("#expression").val().toUpperCase().replace(new RegExp(' ', 'g'), "");
    while (numOf(text, '(') > numOf(text, ')'))
        text += ")";

    var variables = [];
    for (i = 0; i < text.length; i++)
        if ((text[i] >= 'A' && text[i] <= 'Z'))
            if (text.indexOf(text[i]) == i)
                variables.push(text[i]);
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
        for (j = 0; j < variables.length; j++)
            equation = equation.replace(new RegExp(variables[j], 'g'), data[j]);
        string += "<td>" + '-' + "</td><td>" + solve(equation) + "</td></tr>";
    }

    string = "<table align='center' id='table-placeholder'>" + string + "</table>";
    $("#table-placeholder").replaceWith(string);

    function numOf(text, search) {
        var count = 0;
        for (var i = 0; i < text.length; i++)
            if (text[i] == search)
                count++;
        return count;
    }

    function solve(equation) {
        var i, operands = [], operators = [];
        for (i = 0; i < equation.length; i++) {
            switch (equation[i]) {
                case '0':
                case '1':
                    operands.push(equation[i]);
                    break;
                case '*':
                case '+':
                    operators.push(equation[i]);
                    break;
                case '\'':
                    operands.push(1 - parseInt(operands.pop()));
                    break;
                case ')':
                    var num1 = parseInt(operands.pop());
                    var num2 = parseInt(operands.pop());
                    switch (operators.pop()) {
                        case '*':
                            operands.push(num1 * num2);
                            break;
                        case '+':
                            operands.push((num1 + num2) != 0 ? 1 : 0);
                            break;
                    }
                    break;
            }
        }
        return operands;
    }
}

/*
 TEST CASE
 A((B+~C)(A+C))
 */