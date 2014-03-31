var initialChoice;
var situationText;
var selectedFeelings;
var selectedNeeds;
var selectedFeelingsText;
var selectedNeedsText;



$('.initialHappy').click(function(e) {
    e.preventDefault();

    initialHappyChoice();
});

$('.initialSad').click(function(e) {
    e.preventDefault();

    initialSadChoice();
});

function initialHappyChoice(){
    initialChoice = "Happy"
    $('.homeContent').hide();
    $('.homeInput').hide();
    $('.happySituationContent').show();
    $('.situationInput').show();
    $('.userHappySubmit').show();
};

function initialSadChoice(){
    initialChoice = "Sad"
    $('.homeContent').hide();
    $('.homeInput').hide();
    $('.sadSituationContent').show();
    $('.situationInput').show();
    $('.userSadSubmit').show();
};

$("input").keyup(function(e){
    e.preventDefault();

    situationText = $( this ).val();
});


$('.showFeelings').click(function(e) {
    e.preventDefault();

    if(initialChoice == "Happy"){
        $('.happySituationContent').hide();
        $('.userHappySubmit').hide();
        $('#happyFeelingInput').show();
        $('.userHappyFeelingsSubmit').show();
    }
    else {
        $('.sadSituationContent').hide();
        $('.userSadSubmit').hide();
        $('#sadFeelingInput').show();
        $('.userSadFeelingsSubmit').show();
    }

    $('p.userSituation').append(situationText);
    $('.userSituation').show();
});

$(" .feelingsInput div, .needsInput div ").click(function(e){
    e.preventDefault();

    $(this).toggleClass('selected');
});

$('.feelingsSubmit').click(function(e) {
    e.preventDefault();

    var $selected = $('.selected');
    $('.userFeelings').append( $selected );
    $('.feelingsInput').hide();
    $('.userSadFeelingsSubmit').hide();
    $('.userHappyFeelingsSubmit').hide();
    $('.userFeelings').show();
    $('.needsInput').show();
    $('.userNeedsSubmit').show();
});

$('.needsSubmit').click(function(e) {
    e.preventDefault();

    selectedFeelings = $('.userFeelings .selected')
    selectedNeeds = $('.needsInput .selected')

    selectedFeelingsText = '';
    selectedNeedsText = '';


    selectedFeelings.each( function( index ) {
        var element = selectedFeelings[index];
        var feeling = $(element).attr('data-feeling');

        if (selectedFeelings.length == 1){
            selectedFeelingsText = selectedFeelingsText + feeling;
        }

        else if (selectedFeelings.length == 2) {
            selectedFeelingsText = selectedFeelingsText + feeling +' and ';
        }

        else{
            selectedFeelingsText = selectedFeelingsText + feeling +', ';
        }
    });

        if (selectedFeelings.length == 1){
            selectedFeelingsText = selectedFeelingsText;
        }
        else if (selectedFeelings.length == 2){
            selectedFeelingsText = selectedFeelingsText.slice(0,-5);
        }
        else {
            selectedFeelingsText = selectedFeelingsText.slice(0,-2);
            selectedFeelingsText = selectedFeelingsText + ' ';
        }

    selectedNeeds.each( function( index ) {
        var element = selectedNeeds[index];
        var need = $(element).attr('data-need');

        if (selectedNeeds.length == 1){
            selectedNeedsText = selectedNeedsText + need;
        }

        else if (selectedNeeds.length == 2) {
            selectedNeedsText = selectedNeedsText + need +' and ';
        }

        else{
            selectedNeedsText = selectedNeedsText + need +', ';
        }
    });

        if (selectedNeeds.length == 1){
            selectedNeedsText = selectedNeedsText;
            selectedNeedsText = selectedNeedsText + ' ';
        }
        else if(selectedNeeds.length == 2){
            selectedNeedsText = selectedNeedsText.slice(0,-5);
            selectedNeedsText = selectedNeedsText + ' ';
        }
        else {
            selectedNeedsText = selectedNeedsText.slice(0,-2);
            selectedNeedsText = selectedNeedsText + ' ';
        }

    buildEmpathySentence();

    $('.userSituation').hide();
    $('.userFeelings').hide();
    $('.feelingsInput').hide();
    $('.needsInput').hide();
    $('.userNeedsSubmit').hide();

    if(initialChoice == "Happy"){

        $('.selfEmpathy, .happyEmpathySentence').show();
    }
    else{
        $('.selfEmpathy, .sadEmpathySentence').show();
    }

});

$('.empathySentenceSubmit').click(function(e) {
    e.preventDefault();

        $('.selfEmpathy').hide();
        $('.empathySuccess').show();
        $('.selfEmpathyLog').show();

});

function buildEmpathySentence(){

    var empathySentence = situationText + selectedFeelingsText + selectedNeedsText;


    if(initialChoice == "Happy"){
      $('.happyEmpathySentence .situationText').html( situationText );
      $('.happyEmpathySentence .selectedFeelingsText').html( selectedFeelingsText );
      $('.happyEmpathySentence .selectedNeedsText').html( selectedNeedsText );


    }

    else{
      $('.sadEmpathySentence .situationText').html( situationText );
      $('.sadEmpathySentence .selectedFeelingsText').html( selectedFeelingsText );
      $('.sadEmpathySentence .selectedNeedsText').html( selectedNeedsText );
    }

if (localStorage.getItem('entries')){
    var entries = JSON.parse(localStorage.getItem('entries'));
    entries.push({date: Date.now(), text: empathySentence})
}
else{
    var entries = [
    {
        date: Date.now(),
        text: empathySentence
    }
];
}

localStorage.setItem('entries', JSON.stringify(entries));

}
























