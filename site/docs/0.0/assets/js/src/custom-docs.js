(function ($) {
  'use strict'

  // COLOR CONTRAST TABLE
  $('#hide-inaccessible').change(function () {
    if ($('#hide-inaccessible').is(':checked')) {
      $('.inaccessible').css('visibility', 'hidden')  // checked
      $('.inaccessible').parent().css('opacity', '0')
    } else {
      $('.inaccessible').css('visibility', 'visible')  // unchecked
      $('.inaccessible').parent().css('opacity', '1')
    }
  })
}(jQuery))

var specimenButtons = document.querySelectorAll('.js-specimen-modal-trigger');

[].forEach.call(specimenButtons, function(specimenButton) {
    specimenButton.addEventListener("click", specimenChangeFont);
});

function specimenChangeFont(fontClass) {
    var fontClass = this.getAttribute("data-font-class");
    var fontName = this.getAttribute("data-font-name");
    var specimenModalFont = document.getElementById('js-specimen-modal-font');
        specimenModalFont.className = 'table-striped ' + fontClass;
    var specimenModalFontName = document.getElementById('js-change-font-name');
        specimenModalFontName.textContent = fontName;
}
var myRandomSamples = new Array(
                "’n Pak kaarte be​staan uit 52 unieke kaarte.", // Afrikaans
                "Lirika përveç epikës dhe dra​ma​ti​kës është dhunti e tretë letrare", // Albanian
                "Peurvuiañ e vez un toullig en diaz, d’an dour da vont kuit.", // Breton
                "L’accés a l’aigua dolça és de​ter​mi​nant en l’expan​sió de les especies. També podrà des​qua​li​ficar juga​dors, d’acord amb la regla 5.", // Catalan
                "Ved ordspil forstås der et sam​spil imellem to eller flere se​man​tis​ke felter ved hjælp af ligheder på udtryksniveau.", // Danish
                "Het is de voedselbron van zoö​plankton en van hogere dieren.", // Dutch
                "Vicente Guerrero heeft 55.760 in​woners (census 2005) en is de hoofd​plaats van de gemeente San Pablo del Monte.", // Dutch
                "The quick brown fox jumps over the lazy dog.", // English
                "Võid on valmistatud ajast, kui loomapiima on toiduks tarvitatud.", // Estonian
                "Possessiivisuffiksi lii​tetään mah​dollisen sija​päätteen jälkeen.", // Finnish
                "Ces missions sont très souvent assurées par la même personne morale.", // French
                "Son intention est d’extirper les élé​ments qui re​ndent le golf él​itaire et le rendre à la portée de tout le monde.", // French
                "Al è muart di fan parcè che nol veve il fîl par taiâ la polente", // Friulian
                "Patroclo é o amigo máis próximo a Aqui​les, o seu compañeiro de armas.", // Galician
                "Eva jagt zwei Box​kämp​fer quer durch Sylt.", // German
                "1894 begann Drapers Haupt​schaffens​periode, in der er vor allem Themen aus der griechischen Mythologie großformatig malte.", // German
                "Snemmgrískur tími fyl​gir í kjöl​far myr​ku al​dan​na í sögu Grikk​lands Á þessum tíma", // Icelandic
                "Bendera Mada​gaskar disetujui tanggal 14 Oktober 1958, dua tahun sebelum kemer​dekaan, sementara Madagaskar bersiap-siap untuk referendum mengenai statusnya dalam erkumpulan Perancis.", // Indonesian
                "Significato de un obra litte​rari, sin con​side​ration de su expression.", // Interlingua
                "De ghnáth is gnío​mhaío​chtaí daonna atá i gceist.", // Irish
                "La lira è uno stru​men​to musi​cale a corde, noto fino dall’antichità greca classica; i poeti recitavano accompagnati da essa.", // Italian
                "Tendenzialmente la moda è in​comin​ciata all’inizio del ventunesimo secolo.", // Italian
                "Si soll eng éischte Kéier am Joer 1787 als Käre​mille ge​nannt gi sinn. Am Joer 1910 ass d’Mil​len un den Eugène La​mort, engem Neveu vum Jules Lamort, verkaaft ginn.", // Luxemburgish
                "Fototra amin’ny nahandro mala​gasy, aziatika sy indianina izy.", // Malagasy
                "En tesla er en svært stor enhet, jor​dens magnet​felt er på ca. 30 – 60 μT.", // Norwegian
                "Generalament, aquò se tròba a la pesca​riá, mas tanben al taulièr del fresc.", // Occitan
                "Cessou sua ativi​dade no fim da década de 1870.", // Portuguese
                "Tha e glè aotrom, agus a tha a’ fleòdrainn.", // Scottish Gaelic
                "Se comenzó por organizar lo que se lla​maba la gramática.", // Spanish
                "För varje vuxen älg som fälls skall en fällav​gift betalas till läns​styrelsen.", // Swedish
                "Sila ay karaniwang naninirahan mala​pit sa mga lawa at ilog.", // Tagalog
                "Li må d’ Lyme est foirt målåjhey a ric​noxhe, aprume å cmince.", // Walloon
                "Rob was the king of crazy DJ mix​tapes. He loved squir​rels more than gophers and chip​munks." // English
            );

            var mySampleIds = new Array("big1", "big2", "big3", "big4", "big5", "big6", "big7");

            var smallSampleSize = new Array(13, 17, 42);

            function updateSample(myText){
                var i;
                var sample;
                for (i in mySampleIds){
                    sample = document.getElementById(mySampleIds[i]);
                    sample.innerText = myText;
                    sample.firstChild.nodeValue = myText;
                }
                if (myText.match(unescape('%79%65%6C%6C%6F%77'))){document.getElementsByTagName("h2")[0].style.backgroundColor="#ffde00";}
            }

            function abcSample(){updateSample("A​B​C​D​E​F​G​H​I​J​K​L​M​N​O​P​Q​R​S​T​U​V​W​X​Y​Z a​b​c​d​e​f​g​h​i​j​k​l​m​n​o​p​q​r​s​t​u​v​w​x​y​z 0​1​2​3​4​5​6​7​8​9");}
        function customSample(){updateSample(document.bigcontrol.customSampleText.value);}
        function randomSample(){updateSample(myRandomSamples[Math.round(Math.random()*(myRandomSamples.length-1))]);}

            function changeSampleSize(j, d){
                sample = document.getElementById("small" + j);
                if ((smallSampleSize[j-1] + d) > 0) {
                    smallSampleSize[j-1] += d;
                    newSize = smallSampleSize[j-1] + "px";
                    sample.style.fontSize = newSize;
                    var sizeDisplay = new Array();
                    sizeDisplay = document.getElementsByName("smallSampleSize");
                    sizeDisplay[j-1].innerText = newSize;
                    sizeDisplay[j-1].firstChild.nodeValue = newSize;
                }
            }
