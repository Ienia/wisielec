var slowo;
var haslo;
var litera;
var sprawdzone_litery = "";
var etap = 0;

var loose = new Audio("sounds/przegrana.mp3");
var loose2 = new Audio("sounds/amongus.mp3");

var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

window.onload = generuj;

function generuj()
{
    var klawiaturka = "";
    for(i = 0; i<35; i++){
        klawiaturka+="<div class=\"przycisk\" id=\""+litery[i]+"\" onclick=\"literazklawiatury("+i+")\">"+litery[i]+"</div>"
    }
    document.getElementById("klawiatura").innerHTML = klawiaturka;
    document.getElementById("wpisywanie").innerHTML = '<input type="submit" value="Schowaj klawiaturę" onclick="schowajklawiature()">';
    document.getElementById("wpisywanie").style.display = "none";
    document.getElementById("klawiatura").style.display = "none";
}

function onlyletters(str)
{
    return /^[A-Za-z\sĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/.test(str);
}

function zaladujhaslo()
{
    slowo = document.getElementById("slowo").value;
    slowo = slowo.toUpperCase();
    haslo = "";
    sprawdzone_litery = "";
    etap = 0;
    if(onlyletters(slowo))
    {
        for(i=0; i<slowo.length; i++)
        {
            if(slowo.charAt(i)==" ")
                haslo += " ";
            else
                haslo += "-";
        }
        document.getElementById("haslo").innerHTML = haslo;
        document.getElementById("slowo").value = "";
        document.getElementById("komentarz").innerHTML = "";
        document.getElementById("grafika").innerHTML = "<img src=\"grafika/wisielec"+etap+".png\"></img>";
        document.getElementById("literki").innerHTML = sprawdzone_litery;
    }
    else
    {
        document.getElementById("haslo").innerHTML = "";
        document.getElementById("slowo").value = "";
        document.getElementById("komentarz").innerHTML = "Podane hasło zawiera niedozwolone znaki";
        document.getElementById("grafika").innerHTML = "<img src=\"grafika/wisielec"+etap+".png\"></img>";
        document.getElementById("literki").innerHTML = sprawdzone_litery;
    }
    
}

function pobierzlitere()
{
    litera = document.getElementById("litera").value;
    document.getElementById("litera").value = "";
    litera = litera.toUpperCase();
    if(onlyletters(litera) && litera.length==1)
        sprawdzlitere(litera);
    else
    document.getElementById("komentarz").innerHTML = "podana wartość nie jest literą!";
}

function literazklawiatury(znak)
{
    litera = litery[znak];
    sprawdzlitere(litera);
}

function sprawdzlitere(litera)
{
    document.getElementById("komentarz").innerHTML = "";
    var jest = false;
    var dlugosc = slowo.length;
    var new_haslo = "";
    var rozwiazanie = true;
    for(i=0; i<dlugosc; i++)
        if(litera==slowo.charAt(i))
            jest = true;
    if(jest)
    {
        document.getElementById(litera).style.backgroundColor = "rgb(50, 97, 50)";
        document.getElementById(litera).style.border = "2px solid green";
        for(i=0; i<dlugosc; i++)
        {
            if(litera==slowo.charAt(i))
                new_haslo = new_haslo+litera;
            else
                new_haslo = new_haslo+haslo.charAt(i);
        }
        haslo = new_haslo;
        document.getElementById("haslo").innerHTML = haslo;
        for(i=0; i<dlugosc; i++)
        {
            if(slowo.charAt(i)!=haslo.charAt(i))
                rozwiazanie = false;
        }
        if(rozwiazanie == true)
        {
            document.getElementById("zanikanie").style.display = "none";
            document.getElementById("zanikanie2").style.display = "none";
            document.getElementById("komentarz").innerHTML = "ZWYCIĘZTWO!";
        }
    }
    else
    {
        document.getElementById(litera).setAttribute("onclick",";");
        document.getElementById(litera).style.backgroundColor = "rgb(119, 27, 27)";
        document.getElementById(litera).style.border = "2px solid brown";
        var czy_litera_byla = false;
        for(i=0; i < sprawdzone_litery.length; i++)
            if(sprawdzone_litery.charAt(i)==litera)
                czy_litera_byla = true;
        if(czy_litera_byla)
            document.getElementById("komentarz").innerHTML = "Już próbowałeś tę literę!";
        else
        {
            sprawdzone_litery += litera+" ";
            etap++;
            document.getElementById("grafika").innerHTML = "<img src=\"grafika/wisielec"+etap+".png\"></img>";
            document.getElementById("literki").innerHTML = sprawdzone_litery;
            if(etap==7)
            {
                loose.play();
                document.getElementById("komentarz").innerHTML = "PRZEGRAŁEŚ :(<br>hasłem było: "+slowo;
                document.getElementById("zanikanie").style.display = "none";
                document.getElementById("zanikanie2").style.display = "none";
            }
        }
    }
}

function pokazklawiature()
{
    document.getElementById("dolny").style.display = "none";
    document.getElementById("literki").style.display = "none"
    document.getElementById("wpisywanie").style.display = "flex";
    document.getElementById("klawiatura").style.display = "flex";
}

function schowajklawiature()
{
    document.getElementById("literki").style.display = "inline";
    document.getElementById("wpisywanie").style.display = "none";
    document.getElementById("klawiatura").style.display = "none";
    document.getElementById("dolny").style.display = "flex";
    
}

