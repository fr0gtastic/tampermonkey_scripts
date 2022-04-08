// ==UserScript==
// @name         OpenSea / ME Live price
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script made to display the dollar value of a collection on opensea or magiceden.
// @author       fr0gtastic
// @match        *://opensea.io/collection/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=opensea.io
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var dollarFound = typeof $ != 'undefined';
    if (!dollarFound) {
        console.log("$ undefined, try to load JQuery.")
        loadJQuery();
    }
    else {
        console.log("$ has been loaded, pass to avoid errors.");
    }

    function loadJQuery() {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js";
        var parent = document.head || document.body;
        parent.appendChild(script);

        function getLivePrice(txt1, txt2, txt3){
          
            function roundTwo(num1){
                var res1 = Math.round((num1 + Number.EPSILON))
                if (res1.toString().length > 3){
                    return res1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\'");
                } else return res1
            }
          
            var wantedCurr = (txt2 == 'ETH logo') ? "ethereum" : (txt2 == 'SOL logo') ? "solana" : null
            
            $.get( "https://api.coingecko.com/api/v3/simple/price?ids="+wantedCurr+"&vs_currencies=usd", function( data ) {
                var priceNum = (txt3.match(".")) ? (data[wantedCurr].usd * parseFloat(txt3)) : data[wantedCurr].usd * parseInt(txt3)
                var priceElem = "<div class=\"Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cLsBvb kscHgv\" style=\"font-size: large;margin-top: 5px;margin-bottom: -5px;\">$ "+roundTwo(priceNum)+"</div>"
                $(priceElem).insertBefore($(txt1))
            });
        }

        script.onload = function () {
            console.log("JQuery loaded.");
            $(document).ready(function(){
                //OPENSEA
                if (location.href.match(/opensea/)) {
                    console.log("Opensea")
                    var debugColors = false;
                    var wantedClass = "Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 elqhCm jYqxGr dLEHkN CollectionStatsBar--info"
                    var wantedClass2 = "Blockreact__Block-sc-1xf18x6-0 iYAsis"
                    $(".Blockreact__Block-sc-1xf18x6-0 .iYAsis").each(function(){
                        if(this.innerHTML == 'floor price'){
                            console.log("parents:")
                            var icon = $(this).parent().children().first().children().first().children().first().children().first()
                            //Decides by the icon, which chain it is
                            var chain = icon.attr("aria-label")
                            var price_2 = $(this).parent().children().first()
                            var price_3 = $(price_2).children().first().children().last().children().first()

                            getLivePrice(this, chain, price_3[0].innerHTML)
                        }
                    });
                } else if (location.href.match(/magiceden/)){
                    //MAGICEDEN
                }
            })
        }
    }
})();
