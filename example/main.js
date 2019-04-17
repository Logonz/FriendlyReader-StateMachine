/// Globals
/* global $ */
/* global Database */
/// Classes
/* global SynonymStore */
/* global TextStore */

var _GS = null; // GlobalStore
function tagTest() {
  $("body").empty();
  let words = _GS.Symstore.tagText(_GS.TextStore.tokenizedText, "mouseenter", function(event) {
    let parentSpan = $(this);
    let intId = parseInt($(this).data("word-id"));
    let word = $(this).data("word");
    if (event.type === "mouseenter") {
      // Does the child already exist? Remove it to refresh the elements.
      if ($(this).children(".wordtooltip").length) {
        $(this).children(".wordtooltip").remove();
      }
      // Create the element if it doesn't exist.
      if (!$(this).children(".wordtooltip").length) {
        // Create the tooltip in code and Destroy the tooltip when leaving
        let div = $("<div>", { "class": "wordtooltip" }).on("mouseleave", function(event) {
          $(this).remove();
        });
        // Add the words and a click handler.
        let callback = function(event) {
          let id = $(this).data("word-id");
          let synonym = $(this).data("synonym");

          // Actually change the word
          _GS.TextStore.setWord(id, synonym);
          // You can just change the data but synonyms might not exist for the new word.
          parentSpan.attr("data-word", synonym);
          parentSpan.text(synonym);
          // Or you can just unwrap the span to remove all the data (Adviceable)
          parentSpan.contents().unwrap();

          console.log("Clicked tooltip: Word-Id:", id, "Synonym:", synonym, "Event:", event, "this:", $(this));
        };

        let synonyms = _GS.Symstore.getSynonyms(word, 3);
        for (const index in synonyms) {
          div.append($("<div>", { "class": "word-wrapper", "data-word-id": intId, "data-synonym": synonyms[index].synonym }).text(synonyms[index].synonym).click(callback));
        }
        $(this).append(div);
      }
    }
    // _GS.TextStore.setWord(intId, "TEST")
  });

  // TODO: DEBUG REMOVE!
  console.log(words);
  console.log(words.join(""));
  $("body").empty();
  $("body").append(words.join(""));
}

function testanalyze() {
  return _GS.Symstore.analyzeText(_GS.TextStore.text);
}

$(document).ready(function () {
  // Initialize the store and keep track of it (or remove to reset)
  _GS = Database.initialize();
  /* _GS.addStore("WordTest", new WordStore())
  _GS.WordTest.setWord(1, "test");
  _GS.WordTest.setWord(1, "test2");
  _GS.WordTest.setWord(1, "test3");
  _GS.WordTest.setWord(2, "Tjo") */

  // SHOULD NEVER REALLY BE USED this is due to orphaned snapshot
  // _GS.removeStore("WordTest");

  let data = "Det är inte bara vid datum med efterföljande månadsangivelse som det räcker med rena siffror för att ange ordningstal. Även i andra sammanhang kan det bli aktuellt. En av mina böcker har just kommit ut i en femte upplaga. Detta kan i formella sammanhang skrivas: 5 uppl. Skrivsättet används allmänt på böckers titelsidor och i uppgifter inom parentes i recensioner till exempel.";

  let instance = new SynonymStore();
  _GS.addStore("Symstore", new SynonymStore());
  // _GS.Symstore.analyzeText(data);

  ///  Automatic way to get a response
  /* let tt = _GS.Symstore.analyzeText(data);
     console.log("tt:", tt); */
  /// Manual response, for debugging. (use this if you are refreshing often)
  _GS.Symstore.data = JSON.parse("{\"allmänt\":[{\"level\":4,\"synonym\":\"offentligt\"},{\"level\":4.2,\"synonym\":\"officiellt\"},{\"level\":3.1,\"synonym\":\"vanligtvis\"}],\"aktuellt\":[{\"level\":4,\"synonym\":\"gällande\"},{\"level\":3.2,\"synonym\":\"innevarande\"},{\"level\":3.6,\"synonym\":\"nuvarande\"},{\"level\":3.4,\"synonym\":\"populär\"},{\"level\":3,\"synonym\":\"pågående\"},{\"level\":4.1,\"synonym\":\"rådande\"},{\"level\":0,\"synonym\":\"gälla\"},{\"level\":0.2,\"synonym\":\"kommande\"},{\"level\":0.4,\"synonym\":\"het\"},{\"level\":0.2,\"synonym\":\"aktualisera\"}],\"upplaga\":[{\"level\":4,\"synonym\":\"serie\"},{\"level\":3.2,\"synonym\":\"version\"}],\"som\":[{\"level\":4,\"synonym\":\"såsom\"},{\"level\":0.1,\"synonym\":\"roll\"},{\"level\":0.1,\"synonym\":\"fungera\"},{\"level\":0.2,\"synonym\":\"liksom\"}],\"med\":[{\"level\":3.3,\"synonym\":\"tillsammans\"},{\"level\":0.3,\"synonym\":\"och\"},{\"level\":0.1,\"synonym\":\"mot\"},{\"level\":0,\"synonym\":\"använda\"},{\"level\":0,\"synonym\":\"därmed\"},{\"level\":0,\"synonym\":\"delta\"},{\"level\":0.1,\"synonym\":\"samman\"},{\"level\":0.1,\"synonym\":\"omfatta\"},{\"level\":0.1,\"synonym\":\"inkludera\"},{\"level\":0,\"synonym\":\"härmed\"}],\"böckers\":[{\"level\":0.5,\"synonym\":\"litteratur\"},{\"level\":0.2,\"synonym\":\"bibliotek\"},{\"level\":0.9,\"synonym\":\"roman\"},{\"level\":0.2,\"synonym\":\"blad\"},{\"level\":0.7,\"synonym\":\"avhandling\"},{\"level\":0.5,\"synonym\":\"bibel\"},{\"level\":0,\"synonym\":\"lärobok\"},{\"level\":0.3,\"synonym\":\"flora\"}],\"recensioner\":[{\"level\":4,\"synonym\":\"utvärdering\"}],\"exempel\":[{\"level\":5,\"synonym\":\"prov\"},{\"level\":0.6,\"synonym\":\"exempelvis\"}],\"inte\":[{\"level\":4.8,\"synonym\":\"ej\"},{\"level\":4.8,\"synonym\":\"icke\"},{\"level\":0.6,\"synonym\":\"ingen\"},{\"level\":0.3,\"synonym\":\"utan\"},{\"level\":0.3,\"synonym\":\"heller\"},{\"level\":0.2,\"synonym\":\"ens\"},{\"level\":0.3,\"synonym\":\"alls\"},{\"level\":0,\"synonym\":\"utom\"},{\"level\":0,\"synonym\":\"förneka\"},{\"level\":0.4,\"synonym\":\"ingalunda\"}],\"Skrivsättet\":[{\"level\":3.2,\"synonym\":\"formulering\"}],\"på\":[{\"level\":0,\"synonym\":\"av\"},{\"level\":0,\"synonym\":\"över\"},{\"level\":0,\"synonym\":\"yta\"},{\"level\":0,\"synonym\":\"å\"},{\"level\":0,\"synonym\":\"uppe\"},{\"level\":0,\"synonym\":\"yttre\"},{\"level\":0,\"synonym\":\"täcka\"},{\"level\":0,\"synonym\":\"lager\"},{\"level\":0,\"synonym\":\"ovanpå\"},{\"level\":0,\"synonym\":\"varpå\"}],\"andra\":[{\"level\":0,\"synonym\":\"än\"},{\"level\":0,\"synonym\":\"övrig\"},{\"level\":0.1,\"synonym\":\"ena\"},{\"level\":0.1,\"synonym\":\"annars\"},{\"level\":0.2,\"synonym\":\"byta\"},{\"level\":0,\"synonym\":\"ändra\"},{\"level\":0.1,\"synonym\":\"alternativ\"},{\"level\":0.2,\"synonym\":\"varannan\"}],\"i\":[{\"level\":3,\"synonym\":\"inom\"},{\"level\":0.2,\"synonym\":\"genom\"},{\"level\":0.1,\"synonym\":\"in\"},{\"level\":0.1,\"synonym\":\"bland\"},{\"level\":0,\"synonym\":\"innehålla\"},{\"level\":0.1,\"synonym\":\"mitt\"},{\"level\":0.1,\"synonym\":\"inne\"},{\"level\":0,\"synonym\":\"inre\"},{\"level\":0,\"synonym\":\"innefatta\"},{\"level\":0,\"synonym\":\"inlägg\"},{\"level\":0.2,\"synonym\":\"inuti\"},{\"level\":0,\"synonym\":\"däri\"},{\"level\":0,\"synonym\":\"inneboende\"}],\"ut\":[{\"level\":0,\"synonym\":\"utåt\"},{\"level\":-0.3,\"synonym\":\"mynna\"}],\"bara\":[{\"level\":4,\"synonym\":\"blott\"},{\"level\":4.3,\"synonym\":\"enbart\"},{\"level\":5,\"synonym\":\"endast\"},{\"level\":1,\"synonym\":\"bara\"},{\"level\":0.4,\"synonym\":\"enda\"},{\"level\":0.1,\"synonym\":\"idel\"}],\"är\":[{\"level\":4.3,\"synonym\":\"befinna\"},{\"level\":3,\"synonym\":\"bestå\"},{\"level\":3.9,\"synonym\":\"existera\"},{\"level\":3.2,\"synonym\":\"finnas\"},{\"level\":5,\"synonym\":\"produkt\"},{\"level\":0,\"synonym\":\"stå\"},{\"level\":0,\"synonym\":\"hålla\"},{\"level\":0.5,\"synonym\":\"leva\"},{\"level\":0,\"synonym\":\"utgöra\"},{\"level\":0.1,\"synonym\":\"situation\"},{\"level\":0,\"synonym\":\"förekomma\"},{\"level\":0,\"synonym\":\"tillstånd\"},{\"level\":0.1,\"synonym\":\"parti\"},{\"level\":0,\"synonym\":\"artikel\"},{\"level\":0,\"synonym\":\"uppträda\"},{\"level\":0,\"synonym\":\"märke\"},{\"level\":0,\"synonym\":\"faktisk\"},{\"level\":0,\"synonym\":\"långvarig\"},{\"level\":0.1,\"synonym\":\"varaktig\"}],\"böcker\":[{\"level\":0.5,\"synonym\":\"litteratur\"},{\"level\":0.2,\"synonym\":\"bibliotek\"},{\"level\":0.9,\"synonym\":\"roman\"},{\"level\":0.2,\"synonym\":\"blad\"},{\"level\":0.7,\"synonym\":\"avhandling\"},{\"level\":0.5,\"synonym\":\"bibel\"},{\"level\":0,\"synonym\":\"lärobok\"},{\"level\":0.3,\"synonym\":\"flora\"}],\"formella\":[{\"level\":0,\"synonym\":\"formel\"},{\"level\":0.5,\"synonym\":\"informell\"}],\"har\":[{\"level\":3,\"synonym\":\"tillverka\"},{\"level\":3.1,\"synonym\":\"äga\"},{\"level\":0.1,\"synonym\":\"med\"},{\"level\":0,\"synonym\":\"egen\"},{\"level\":0,\"synonym\":\"gemensam\"},{\"level\":0,\"synonym\":\"efterfrågan\"},{\"level\":0.5,\"synonym\":\"hysa\"},{\"level\":0,\"synonym\":\"förvara\"}],\"av\":[{\"level\":3.4,\"synonym\":\"bruten\"},{\"level\":3.2,\"synonym\":\"från\"},{\"level\":4,\"synonym\":\"itu\"},{\"level\":0.4,\"synonym\":\"varav\"},{\"level\":0,\"synonym\":\"därav\"}],\"vid\":[{\"level\":4,\"synonym\":\"bred\"},{\"level\":3.4,\"synonym\":\"intill\"},{\"level\":4.3,\"synonym\":\"samman\"},{\"level\":3.6,\"synonym\":\"utbredd\"},{\"level\":0.2,\"synonym\":\"hos\"},{\"level\":0,\"synonym\":\"röra\"},{\"level\":0,\"synonym\":\"nära\"},{\"level\":0.1,\"synonym\":\"omkring\"},{\"level\":0,\"synonym\":\"förbi\"},{\"level\":0.3,\"synonym\":\"bredvid\"},{\"level\":0,\"synonym\":\"kant\"},{\"level\":-0.1,\"synonym\":\"vidga\"},{\"level\":0.5,\"synonym\":\"invid\"},{\"level\":0,\"synonym\":\"härvid\"},{\"level\":0,\"synonym\":\"vidd\"}],\"en\":[{\"level\":3.2,\"synonym\":\"ett\"},{\"level\":4,\"synonym\":\"någon\"},{\"level\":0,\"synonym\":\"själv\"},{\"level\":0,\"synonym\":\"första\"},{\"level\":0.4,\"synonym\":\"samma\"},{\"level\":0.3,\"synonym\":\"viss\"},{\"level\":0.3,\"synonym\":\"enkel\"},{\"level\":0.3,\"synonym\":\"enskild\"},{\"level\":0.1,\"synonym\":\"ensam\"},{\"level\":-0.1,\"synonym\":\"enhet\"},{\"level\":0.1,\"synonym\":\"enstaka\"}],\"En\":[{\"level\":3.2,\"synonym\":\"ett\"},{\"level\":4,\"synonym\":\"någon\"},{\"level\":0,\"synonym\":\"själv\"},{\"level\":0,\"synonym\":\"första\"},{\"level\":0.4,\"synonym\":\"samma\"},{\"level\":0.3,\"synonym\":\"viss\"},{\"level\":0.3,\"synonym\":\"enkel\"},{\"level\":0.3,\"synonym\":\"enskild\"},{\"level\":0.1,\"synonym\":\"ensam\"},{\"level\":-0.1,\"synonym\":\"enhet\"},{\"level\":0.1,\"synonym\":\"enstaka\"}],\"för\":[{\"level\":4.3,\"synonym\":\"förut\"},{\"level\":0,\"synonym\":\"för\"},{\"level\":0,\"synonym\":\"därför\"},{\"level\":0,\"synonym\":\"varför\"},{\"level\":0,\"synonym\":\"nämligen\"},{\"level\":0,\"synonym\":\"anledning\"},{\"level\":0,\"synonym\":\"härför\"}],\"används\":[{\"level\":4.3,\"synonym\":\"bruka\"},{\"level\":4.2,\"synonym\":\"förbruka\"},{\"level\":3,\"synonym\":\"hantera\"},{\"level\":3.2,\"synonym\":\"konsumera\"},{\"level\":4.7,\"synonym\":\"nyttja\"},{\"level\":3.3,\"synonym\":\"tillämpa\"},{\"level\":0,\"synonym\":\"genom\"},{\"level\":0,\"synonym\":\"köra\"},{\"level\":0,\"synonym\":\"utnyttja\"},{\"level\":0,\"synonym\":\"medel\"},{\"level\":0,\"synonym\":\"användning\"},{\"level\":0,\"synonym\":\"nytta\"},{\"level\":0,\"synonym\":\"användare\"},{\"level\":0,\"synonym\":\"verktyg\"},{\"level\":0,\"synonym\":\"redskap\"},{\"level\":0,\"synonym\":\"anlita\"},{\"level\":0,\"synonym\":\"användbar\"},{\"level\":0,\"synonym\":\"nyttig\"},{\"level\":0,\"synonym\":\"använd\"},{\"level\":0,\"synonym\":\"apparat\"},{\"level\":0,\"synonym\":\"användande\"},{\"level\":0,\"synonym\":\"tillgripa\"}],\"till\":[{\"level\":4.1,\"synonym\":\"mot\"},{\"level\":4,\"synonym\":\"åt\"},{\"level\":0,\"synonym\":\"från\"},{\"level\":-0.1,\"synonym\":\"komma\"},{\"level\":-0.1,\"synonym\":\"leda\"},{\"level\":0.3,\"synonym\":\"tills\"},{\"level\":0,\"synonym\":\"därtill\"},{\"level\":0,\"synonym\":\"till_och_med\"},{\"level\":0,\"synonym\":\"tillsätta\"},{\"level\":0,\"synonym\":\"framme\"},{\"level\":0,\"synonym\":\"tillföra\"},{\"level\":0,\"synonym\":\"härtill\"}],\"kommit\":[{\"level\":3.6,\"synonym\":\"anlända\"},{\"level\":3.3,\"synonym\":\"följa\"},{\"level\":0.5,\"synonym\":\"hamna\"},{\"level\":0,\"synonym\":\"besöka\"},{\"level\":0,\"synonym\":\"kommande\"},{\"level\":0.3,\"synonym\":\"samlas\"},{\"level\":0.4,\"synonym\":\"utebli\"}],\"uppgifter\":[{\"level\":4,\"synonym\":\"mission\"},{\"level\":4.4,\"synonym\":\"syssla\"},{\"level\":3.4,\"synonym\":\"uppdrag\"},{\"level\":0.6,\"synonym\":\"arbetsuppgift\"},{\"level\":0.7,\"synonym\":\"huvuduppgift\"},{\"level\":0.2,\"synonym\":\"mandat\"}],\"räcker\":[{\"level\":4,\"synonym\":\"skicka\"},{\"level\":0,\"synonym\":\"vara\"},{\"level\":0,\"synonym\":\"nog\"},{\"level\":0,\"synonym\":\"fly\"}],\"rena\":[{\"level\":3,\"synonym\":\"fräsch\"},{\"level\":0.1,\"synonym\":\"klar\"},{\"level\":0.2,\"synonym\":\"frisk\"},{\"level\":0,\"synonym\":\"tvätta\"},{\"level\":0.3,\"synonym\":\"smutsig\"},{\"level\":0.4,\"synonym\":\"rena\"},{\"level\":0.2,\"synonym\":\"steril\"}],\"just\":[{\"level\":4,\"synonym\":\"exakt\"},{\"level\":3.6,\"synonym\":\"hederlig\"},{\"level\":4,\"synonym\":\"hygglig\"},{\"level\":4.5,\"synonym\":\"nyligen\"},{\"level\":4.1,\"synonym\":\"nyss\"},{\"level\":4.6,\"synonym\":\"precis\"},{\"level\":4.2,\"synonym\":\"rättvis\"},{\"level\":0,\"synonym\":\"själv\"},{\"level\":0.1,\"synonym\":\"noggrann\"}],\"bli\":[{\"level\":3.3,\"synonym\":\"bliva\"},{\"level\":0,\"synonym\":\"uppstå\"},{\"level\":0.4,\"synonym\":\"tillkomma\"},{\"level\":0.1,\"synonym\":\"blivande\"},{\"level\":0.5,\"synonym\":\"uppkomma\"},{\"level\":0,\"synonym\":\"kandidat\"},{\"level\":0,\"synonym\":\"förestå\"}],\"kan\":[{\"level\":4,\"synonym\":\"veta\"},{\"level\":0,\"synonym\":\"lära\"},{\"level\":0.2,\"synonym\":\"klara\"},{\"level\":0.3,\"synonym\":\"kunskap\"},{\"level\":0.1,\"synonym\":\"praktisk\"},{\"level\":0.1,\"synonym\":\"konst\"},{\"level\":0.1,\"synonym\":\"duktig\"},{\"level\":0,\"synonym\":\"förmå\"},{\"level\":0.4,\"synonym\":\"orka\"},{\"level\":0,\"synonym\":\"yrke\"},{\"level\":0,\"synonym\":\"expert\"},{\"level\":0,\"synonym\":\"tåla\"},{\"level\":0,\"synonym\":\"van\"},{\"level\":0,\"synonym\":\"behärska\"},{\"level\":0.1,\"synonym\":\"kunnande\"},{\"level\":0.1,\"synonym\":\"kunnig\"}],\"Även\":[{\"level\":3.3,\"synonym\":\"dessutom\"},{\"level\":4,\"synonym\":\"också\"},{\"level\":3.3,\"synonym\":\"samt\"},{\"level\":3.2,\"synonym\":\"tillika\"},{\"level\":0,\"synonym\":\"till_och_med\"},{\"level\":0,\"synonym\":\"likaväl\"}],\"och\":[{\"level\":4.3,\"synonym\":\"samt\"},{\"level\":0,\"synonym\":\"också\"},{\"level\":0,\"synonym\":\"både\"},{\"level\":0,\"synonym\":\"såväl\"}],\"inom\":[{\"level\":0,\"synonym\":\"område\"}],\"skrivas\":[{\"level\":4,\"synonym\":\"anteckna\"},{\"level\":4,\"synonym\":\"berätta\"},{\"level\":3.5,\"synonym\":\"författa\"},{\"level\":3.1,\"synonym\":\"notera\"},{\"level\":4,\"synonym\":\"uppge\"},{\"level\":0.1,\"synonym\":\"kort\"},{\"level\":0.2,\"synonym\":\"skrift\"},{\"level\":-0.1,\"synonym\":\"kontor\"},{\"level\":0,\"synonym\":\"sekreterare\"},{\"level\":0,\"synonym\":\"tavla\"},{\"level\":0.1,\"synonym\":\"skriftlig\"},{\"level\":0.3,\"synonym\":\"tillskriva\"},{\"level\":0.2,\"synonym\":\"penna\"},{\"level\":0.1,\"synonym\":\"dagbok\"},{\"level\":0.2,\"synonym\":\"skribent\"},{\"level\":0.3,\"synonym\":\"rista\"},{\"level\":0.1,\"synonym\":\"skrivare\"},{\"level\":0.1,\"synonym\":\"oskriven\"},{\"level\":0.2,\"synonym\":\"skrivande\"},{\"level\":0.6,\"synonym\":\"underteckna\"}],\"sammanhang\":[{\"level\":3.3,\"synonym\":\"koppling\"},{\"level\":3.4,\"synonym\":\"samband\"}],\"ange\":[{\"level\":4.1,\"synonym\":\"nämna\"},{\"level\":3,\"synonym\":\"röja\"},{\"level\":3.1,\"synonym\":\"uppge\"}],\"siffror\":[{\"level\":4.6,\"synonym\":\"nummer\"},{\"level\":0.1,\"synonym\":\"fyra\"},{\"level\":0.2,\"synonym\":\"bit\"},{\"level\":0,\"synonym\":\"åtta\"},{\"level\":0.3,\"synonym\":\"etta\"},{\"level\":0,\"synonym\":\"tvåa\"},{\"level\":0.2,\"synonym\":\"trea\"},{\"level\":0.3,\"synonym\":\"femma\"}]}");

  _GS.addStore("TextStore", new TextStore(data));

  _GS.TextStore.newText(data);
  tagTest();
  /* _GS.Symstore.tagText(_GS.TextStore.tokenizedText, "mouseenter", function(event) {
    let parentSpan = $(this);
    let intId = parseInt($(this).data("word-id"));
    let word = $(this).data("word");
    if (event.type === "mouseenter") {
      // Does the child already exist? If not, create else do nothing!
      if (!$(this).children(".wordtooltip").length) {
        // Create the tooltip in code and Destroy the tooltip when leaving
        let div = $("<div>", { "class": "wordtooltip" }).on("mouseleave", function(event) {
          $(this).remove();
        });

        // Add the words and a click handler.
        let callback = function(event) {
          let id = $(this).data("word-id");
          let synonym = $(this).data("synonym");

          // Actually change the word
          _GS.TextStore.setWord(id, synonym);
          // You can just change the data but synonyms might not exist for the new word.
          parentSpan.attr("data-word", synonym);
          parentSpan.text(synonym);
          // Or you can just unwrap the span to remove all the data (Adviceable)
          parentSpan.contents().unwrap();

          console.log("Clicked tooltip: Word-Id:", id, "Synonym:", synonym, "Event:", event, "this:", $(this));
        };

        let synonyms = _GS.Symstore.getSynonyms(word, 3);
        for (const index in synonyms) {
          div.append($("<div>", { "class": "word-wrapper", "data-word-id": intId, "data-synonym": synonyms[index].synonym }).text(synonyms[index].synonym).click(callback));
        }
        $(this).append(div);
      }
    }
    // _GS.TextStore.setWord(intId, "TEST")
  }); */

  /* _GS.Symstore.tagText(_GS.TextStore.tokenizedText, function(){
    let element = $.parseHTML(this);
    console.log(this, element)

  }); */

  // data = "Det är inte bara bara vid datum med efterföljande månadsangivelse som det räcker med rena siffror för att ange ordningstal. Även i andra sammanhang kan det bli aktuellt. En av mina böcker har just kommit ut i en femte upplaga. Detta kan i formella sammanhang skrivas: 5 uppl. Skrivsättet används allmänt på böckers titelsidor och i uppgifter inom parentes i recensioner till exempel.";

  // _GS.TextStore.newText(data);

  console.log(_GS.TextStore.tokenizedText);

  console.log("HTML:", _GS);
});
