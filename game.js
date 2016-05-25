/*Cadenas
 *
 * /game.js - Canvas initialisation, game launcher
 *
 * coded by Anne
 * started at 17/05/2016
 */

 ( function( Cadenas ) {

     "use strict";

     var oApp = {
            "canvas": null,
            "context": null,
            "width": null,
            "height": null
        },
        _isCanvasSupported;

    _isCanvasSupported = function( $canvasElt ) {
        return !!$canvasElt.getContext; // !! transforme en booleen pour faire la comparaison
    };

    oApp.setup = function() {
        this.canvas = document.querySelector( "#game" );

        if( !_isCanvasSupported( this.canvas ) ) {
            return console.error( "Canvas isn't supported!" );
        }

        this.context = this.canvas.getContext( "2d" );
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        window.game = new Cadenas( this );
    };

    oApp.setup();

} )( window.Cadenas );
