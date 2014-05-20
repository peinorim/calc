$(function() {
    var somope = 0;
    var ans = 0;
    var positif = true;
    var inv = false;
    $('#signe').click(function() {
        positif = !positif;
        if (!positif) {
            $(".numeric").each(function() {
                if ($(this).text() !== '.') {
                    $(this).text("-" + $(this).text());
                }
            });
        } else {
            $(".numeric").each(function() {
                $(this).text($(this).text().replace("-", ""));
            });
        }
    });

    $("#inv").on("click", function() {
        inv = !inv;
        if (inv === true) {
            $("#cos").attr("id", "cosinv");
            $("#cosinv").html("cos<sup>-1</sup>");
            $("#sin").attr("id", "sininv");
            $("#sininv").html("sin<sup>-1</sup>");
            $("#tan").attr("id", "taninv");
            $("#taninv").html("tan<sup>-1</sup>");
            $("#rac").attr("id", "carre");
            $("#carre").html("x<sup>2</sup>");
            $("#exp").attr("id", "ln");
            $("#ln").html("ln");
            $("#puiss").attr("id", "yrac");
            $("#yrac").html("<sup>y</sup>√x");
        } else {
            $("#cosinv").attr("id", "cos");
            $("#cos").html("cos");
            $("#sininv").attr("id", "sin");
            $("#sin").html("sin");
            $("#taninv").attr("id", "tan");
            $("#tan").html("tan");
            $("#carre").attr("id", "rac");
            $("#rac").html("√");
            $("#ln").attr("id", "exp");
            $("#exp").html("e");
            $("#yrac").attr("id", "puiss");
            $("#puiss").html("x<sup>y</sup>");
        }
    });

    $('#afficheur').change(function() {
        if ($(this).val() === "Non défini") {
            $(this).val("");
        }
    });

    $('.operateur').click(function() {
        var affich = $("#afficheur").val();
        var tape = "";
        if ($(this).attr("id") === "puiss") {
            tape = "^";
        } else if ($(this).attr("id") === "yrac") {
            tape = "√";
        } else {
            tape = $(this).text();
        }
        somope++;
        if (!isOperator(affich.substr(affich.length - 1))) {
            if (somope <= 1) {
                affich += tape;
                $("#afficheur").val(affich);
            } else if (somope > 1) {
                var res = calcule(affich);
                $("#afficheur").val(res + tape);
                somope--;
            }
        }
        return false;
    });
    $('.numeric').click(function() {
        var affich = $("#afficheur").val();
        var tape = "";
        tape = $(this).text();
        affich += tape;
        $("#afficheur").val(affich);
        return false;
    });
    $('#pi').click(function() {
        var calcul = $("#afficheur").val();
        var fonc = $(this).attr("id");
        var lib = $(this).text();
        if (calcul === '') {
            ans = maths(calcul, fonc);
            if (!isNaN(parseFloat(ans))) {
                $("#afficheur").val(parseFloat(ans));
            } else {
                ans = 0;
                $("#afficheur").val("");
                $("#afficheur").attr("placeholder", "Non défini");
            }
        } else {
            calcul += lib;
            $("#afficheur").val(calcul);
        }
        somope = 0;
        return false;
    });
    $('.math').click(function() {
        var calcul = $("#afficheur").val();
        var fonc = $(this).attr("id");
        if (calcul !== '') {
            ans = maths(calcul, fonc);
            if (!isNaN(parseFloat(ans))) {
                $("#afficheur").val(parseFloat(ans));
            } else {
                ans = 0;
                $("#afficheur").val("");
                $("#afficheur").attr("placeholder", "Non défini");
            }
        }
        somope = 0;
        return false;
    });
    $('#ans').click(function() {
        var affich = $("#afficheur").val();
        affich += ans;
        $("#afficheur").val(affich);
        return false;
    });
    $('#back').click(function() {
        var affich = $("#afficheur").val();
        if (isOperator(affich.substr(affich.length - 1))) {
            somope--;
        }
        var affichNew = affich.slice(0, -1);
        $("#afficheur").val(affichNew);
        return false;
    });
    $('#reset').click(function() {
        $("#afficheur").val("");
        $("#afficheur").attr("placeholder", "");
        $("#ans").val("");
        somope = 0;
        return false;
    });
    $('#result').click(function() {
        var calcul = $("#afficheur").val();
        if (calcul !== '') {
            ans = calcule(calcul);
            if (!isNaN(parseFloat(ans))) {
                $("#afficheur").val(parseFloat(ans));
            } else {
                ans = 0;
                $("#afficheur").val("");
                $("#afficheur").attr("placeholder", "Non défini");
            }
        }
        somope = 0;
        return false;
    });
    $('#percent').click(function() {
        var calcul = $("#afficheur").val();
        if (calcul !== '') {
            ans = percent(calcul);
            $("#afficheur").val(parseFloat(ans));
        }
        somope = 0;
        return false;
    });
    $(document).keyup(function(e) {
        if (e.keyCode === 13) { //entrée
            $('#result').click();
        } else if (e.keyCode >= 96 && e.keyCode <= 105) { //chiffres
            var nbr = e.keyCode - 96;
            var affich = $("#afficheur").val();
            affich += nbr;
            $("#afficheur").val(affich);
        } else if (e.keyCode === 106) { //mult
            $('#mult').click();
        } else if (e.keyCode === 107) { //plus
            $('#add').click();
        } else if (e.keyCode === 109) { //moins
            $('#moins').click();
        } else if (e.keyCode === 110) { //virg
            $('#virg').click();
        } else if (e.keyCode === 111) { //div
            $('#divis').click();
        }
    });
});
//-------------------------------------------\\    
//---------------Fonctions-------------------\\
//-------------------------------------------\\
var ope = ["÷", "x", "+", "-", "^", "√"];

function isOperator(str) {
    if (ope.indexOf(str) !== -1) {
        return true;
    } else {
        return false;
    }
}
function percent(str) {
    var solo = true;
    for (var i = 0; i < ope.length; i++) {
        if (str.indexOf(ope[i]) !== -1) {
            var nums = str.split(ope[i]);
            str = str.replace("π", Math.PI);
            solo = false;
            switch (i) {
                case 0:
                    return parseFloat(nums[0]) / (parseFloat(nums[0]) * parseFloat(nums[1]) / 100);
                    break;
                case 1:
                    return parseFloat(nums[0]) * (parseFloat(nums[0]) * parseFloat(nums[1]) / 100);
                    break;
                case 2:
                    return parseFloat(nums[0]) + (parseFloat(nums[0]) * parseFloat(nums[1]) / 100);
                    break;
                case 3:
                    return parseFloat(nums[0]) - (parseFloat(nums[0]) * parseFloat(nums[1]) / 100);
                    break;
            }
        }
    }
    if (solo === true) {
        return parseFloat(str) / 100;
    }
}
function calcule(str) {
    for (var i = 0; i < ope.length; i++) {
        if (str.indexOf(ope[i]) !== -1) {
            str = str.replace("π", Math.PI);
            var nums = str.split(ope[i]);
            switch (i) {
                case 0:
                    return parseFloat(nums[0]) / parseFloat(nums[1]);
                    break;
                case 1:
                    return parseFloat(nums[0]) * parseFloat(nums[1]);
                    break;
                case 2:
                    return parseFloat(nums[0]) + parseFloat(nums[1]);
                    break;
                case 3:
                    if (!$('#signe').hasClass('active')) {
                        return parseFloat(nums[0]) - parseFloat(nums[1]);
                    } else {
                        if (isNaN(parseFloat("-" + nums[1]) - parseFloat("-" + nums[3]))) {
                            return parseFloat(nums[0]) - parseFloat(nums[1]);
                        } else {
                            return parseFloat("-" + nums[1]) - parseFloat("-" + nums[3]);
                        }
                    }
                    break;
                case 4:
                    return Math.pow(parseFloat(nums[0]), parseFloat(nums[1]));
                    break;
                case 5:
                    return Math.pow(parseFloat(nums[1]), 1 / parseFloat(nums[0]));
                    break;
            }
        }
    }
    return parseFloat(str);
}
function maths(calcul, fonc) {
    var res = calcule(calcul);
    switch (fonc) {
        case "pi":
            return Math.PI;
            break;
        case "cos":
            return Math.cos(angles(res));
            break;
        case "cosinv":
            return Math.acos(angles(res));
            break;
        case "sin":
            return Math.sin(angles(res));
            break;
        case "sininv":
            return Math.asin(angles(res));
            break;
        case "tan":
            return Math.tan(angles(res));
            break;
        case "taninv":
            return Math.atan(angles(res));
            break;
        case "exp":
            return Math.exp(res);
            break;
        case "carre":
            return Math.pow(res, 2);
            break;
        case "rac":
            return Math.pow(res, 0.5);
            break;
        case "ln":
            return Math.log(res);
            break;
        case "log":
            return Math.log(res) / Math.log(10);
            break;
        case "facto":
            return facto(res);
            break;
    }
}
function facto(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * facto(n - 1);
    }
}
function angles(res) {
    if ($('#deg').hasClass('active')) {
        return res;
    } else if ($('#rad').hasClass('active')) {
        return res * Math.PI / 180;
    } else if ($('#grad').hasClass('active')) {
        return res / 0.9;
    } else {
        return res;
    }
}