# tampermonkey_scripts
* Userscripts I've coded using TamperMonkey and JQuery
* JQuery reference is from: https://github.com/XhyEax/JQueryAutoLoad/blob/main/JQueryAutoLoad.js
# Table Of Contents:
* [Different scripts](#actual-scripts-descriptions)
  * [live_os_me.js]
* [Installation](#installation)
* [To-dos](#to-dos)
# Actual scripts descriptions:
## [live_os_me.js](https://github.com/fr0gtastic/tampermonkey_scripts/live_os_me.js)
1. Recognizes when you are on a collection's page on OpenSea or MagicEden.
2. Takes the collcetion's floor price from the HTML element
3. Makes a request to CoinGecko to get live price of the cryptocurrency (ETH / SOL)
4. Multiplies it by collection's floor price and returns a rounded and beautified result.

# Installation:
* Info here in future

# To-Dos:
## live_os_me.js:
* Display `'` separators if number greater than a thousand
* Make it work on MagicEden
* Make the price auto-update every X seconds ?
