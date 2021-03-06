/* Jeu du cadenas
 *
 * /cadenas.js - cadenas main class
 *
 * coded by Anne
 * started at 17/05/2016
 */

 ( function() {
     "use strict";

     var Cadenas;

     Cadenas = function( oApp ) {
         var game = this; // eslint-disable-line consistent-this

         this.app = oApp;

         this.time = {
             "start": null,
             "current": null
         };

         // Background
         this.background = {
             "frame": {
                 "sx": 0,
                 "sy": 0,
                 "sw": 288,
                 "sh": 511,
                 "dx": 0,
                 "dy": 0,
                 "dw": game.app.width,
                 "dh": game.app.height
             },
             "draw": function() {
                 game._drawSpriteFromFrame( this.frame );
             }
         };

         // Cadenas
         this.cadenas = {
             "frame": {
                 "sx": 298,
                 "sy": 12,
                 "sw": 251,
                 "sh": 251,
                 "dx": game.app.width / 2 - 125,
                 "dy": game.app.height / 2 - 60,
                 "dw": 251,
                 "dh": 251
             },
             "draw": function() {
                 game._drawSpriteFromFrame( this.frame );
             }
         };

         // Anse
         this.anse = {
             "frame": {
                 "sx": 369,
                 "sy": 288,
                 "sw": 110,
                 "sh": 115,
                 "dx": game.app.width / 2 - 55,
                 "dy": game.app.height / 2 - 140,
                 "dw": 110,
                 "dh": 115
             },
             "draw": function() {
                 game._drawSpriteFromFrame( this.frame );
             },
             "upadate": function() {

             }
         };

         // Ball
         this.ball = {
             "frame": {
                 "sx": 321,
                 "sy": 274,
                 "sw": 27,
                 "sh": 27
             },
             "init": function() {

                 this.animation = {
                    // "maxSteps": this.frame.length++,
                     "step": 0
                 };
                 this.state = {
                     "rotation": 0
                 };
                 this.score = {
                     "current": 0,
                     "previous": 0
                 };
                 this.position = {};
                 this.destinationFrame = {
                     "dx": game.app.width / 2 - 13,
                     "dy": game.app.height / 2 - 55,
                     "dw": 27,
                     "dh": 27
                 };

                 this.state.rotation = ( Math.PI * 2 ) * Math.random();
             },
             "draw": function() {
                 var oFrom = this.frame,
                     oDest = this.destinationFrame,
                     oContext = game.app.context;

                 oContext.save();
                 oContext.translate( game.app.width / 2, game.app.height / 2 + 66 );
                 oContext.rotate( this.state.rotation );
                 oContext.drawImage(
                    game.spriteSheet,
                    oFrom.sx,
                    oFrom.sy,
                    oFrom.sw,
                    oFrom.sh,
                    -13,
                    -123,
                    oDest.dw,
                    oDest.dh
                );
                 oContext.restore();
             },
             "update": function( oEvent ) {
                 // var self = this;
                 if ( oEvent ) {
                     if ( ( oEvent.type === "click" || ( oEvent.type === "keyup" && oEvent.keyCode === 32 ) ) ) {
                         if( game.started ){
                             if ( ( game.line.state.rotation <= ( this.state.rotation + ( 20 * ( Math.PI/180 ) ) ) ) && ( game.line.state.rotation >= ( this.state.rotation - ( 6 * ( Math.PI/180 ) ) ) ) ) {
                                 this.score.current += 1;
                                 game.line.coeff *= -1;
                                 this.state.rotation = ( Math.PI * 2 ) * Math.random();
                                 console.log( this.score.current );
                             } else {
                                 console.log( 'raté!' );
                                 game.over();
                             }
                         }
                     }
                 }
                  // console.log(this.state.rotation);
                 if ( this.state.rotation >= 2 * Math.PI ) {
                     this.state.rotation = 0;
                 }

                 return this.state.rotation;
             }
         };

         // draw line
         this.line = {
             "frame": {
                 "sx": 330,
                 "sy": 319,
                 "sw": 4,
                 "sh": 32
             },
             "init": function() {

                 this.animation = {
                    // "maxSteps": this.frame.length++,
                     "step": 0
                 };
                 this.state = {
                     "rotation": 0,
                     "acceleration": 0,
                     "isInOkZone": false
                 };
                 this.score = {
                     "current": 0,
                     "previous": 0
                 };
                 this.position = {};
                 this.destinationFrame = {
                     "dx": game.app.width / 2 - 2,
                     "dy": game.app.height / 2 - 58,
                     "dw": 4,
                     "dh": 32
                 };
                 this.turn = false;
                 this.coeff = 1;
             },
             "draw": function() {
                 var oFrom = this.frame,
                     oDest = this.destinationFrame,
                     oContext = game.app.context;

                 oContext.save();
                 oContext.translate( game.app.width / 2, game.app.height / 2 + 66 );
                 oContext.rotate( this.state.rotation );
                 oContext.drawImage(
                    game.spriteSheet,
                    oFrom.sx,
                    oFrom.sy,
                    oFrom.sw,
                    oFrom.sh,
                    -2,
                    -123,
                    oDest.dw,
                    oDest.dh
                );
                 oContext.restore();
             },
             "update": function( oEvent ) {
                 // var self = this;
                 if ( oEvent ) {
                     if ( ( oEvent.type === "click" || ( oEvent.type === "keyup" && oEvent.keyCode === 32 ) ) ) {
                         this.turn = true;
                         game.started = true;
                     }
                 }
                 if( this.turn ) {
                     this.state.rotation += (1+(game.ball.score.current/10 >= 0.6 ? 1 : game.ball.score.current/10)) * this.coeff * ( Math.PI / 180 );
                 }
                 // console.log(this.state.rotation);

                 if ( this.state.rotation >= 2 * Math.PI ) {
                     this.state.rotation = 0;
                 }

                 if ( this.state.rotation < 0 ) {
                     this.state.rotation = 2 * Math.PI;
                 }

                 return this.state.rotation;

             }
         };

         this.points = {
             "frame": {
                 "cyphers": {
                     "sx": 567,
                     "sw": 25,
                     "sh": 36,
                     "sy": {
                         "0": 8,
                         "1": 65,
                         "2": 123,
                         "3": 181,
                         "4": 238,
                         "5": 296,
                         "6": 353,
                         "7": 411,
                         "8": 469,
                         "9": 526
                     }
                 }
             },
             "drawScore": function( iScore ) {
                 var aScoreParts = ( iScore + "" ).split( "" ),
                     self = this;

                 aScoreParts.reverse().forEach( function( sScorePart, iIndex ) {
                     var iDx = ( game.app.width / 2 ) - self.frame.cyphers.sw;

                     game._drawSpriteFromFrame( {
                         "sx": self.frame.cyphers.sx,
                         "sy": self.frame.cyphers.sy[ sScorePart ],
                         "sw": self.frame.cyphers.sw,
                         "sh": self.frame.cyphers.sh,
                         "dx": iDx - ( self.frame.cyphers.sw + 2 ) * iIndex + ( ( game.ball.score.current < 10 ) ? 15 : 25 ),
                         "dy": game.app.height / 2 + 50,
                         "dw": self.frame.cyphers.sw,
                         "dh": self.frame.cyphers.sh
                     } );
                 } );
             }
         };

         this.gameOver = {
             "frames": {
                 "cadre": {
                     "sx": 334,
                     "sy": 494,
                     "sw": 186,
                     "sh": 99,
                     "dx": game.app.width / 2 - 93,
                     "dy": game.app.height / 2 - 50,
                     "dw": 186,
                     "dh": 99
                 },
                 "cyphers": {
                     "sx": 641,
                     "sw": 13,
                     "sh": 20,
                     "sy": {
                         "0": 157,
                         "1": 185,
                         "2": 214,
                         "3": 243,
                         "4": 272,
                         "5": 301,
                         "6": 330,
                         "7": 358,
                         "8": 387,
                         "9": 416
                     }
                 }
                },
                "draw": function() {
                     game._drawSpriteFromFrame( this.frames.cadre );
                 },
                 "drawScore": function(iScore) {
                     var aScoreParts = ( iScore + "" ).split( "" ),
                         self = this;

                     aScoreParts.forEach( function( sScorePart, iIndex ) {
                         var iDx = ( game.app.width / 2 ) - self.frames.cyphers.sw;

                         game._drawSpriteFromFrame( {
                             "sx": self.frames.cyphers.sx,
                             "sy": self.frames.cyphers.sy[ sScorePart ],
                             "sw": self.frames.cyphers.sw,
                             "sh": self.frames.cyphers.sh,
                             "dx": iDx - ( self.frames.cyphers.sw + 2 ) * iIndex + 20,
                             "dy": self.frames.cadre.dy + 50,
                             "dw": self.frames.cyphers.sw,
                             "dh": self.frames.cyphers.sh
                         } );
                     } );
                 }
         };

         // Fonction pour dessiner
         this._drawSpriteFromFrame = function( oFrame ) {
             this.app.context.drawImage(
                 this.spriteSheet,
                 oFrame.sx,
                 oFrame.sy,
                 oFrame.sw,
                 oFrame.sh,
                 oFrame.dx,
                 oFrame.dy,
                 oFrame.dw,
                 oFrame.dh
             );
         };

         this.animate = function() {
             this.time.current = Date.now();
             this.animationRequestID = window.requestAnimationFrame( this.animate.bind( this ) );

             // effacer le contenu pour ne pas qu'il reste en-dessous à chaque fois
             this.app.context.clearRect( 0, 0, this.app.width, this.app.height );

             // draw background
             this.background.draw();

             // draw Anse
             this.anse.draw();

             // draw cadenas
             this.cadenas.draw();

             // draw Ball
             this.ball.draw();
             this.ball.update();

             // draw line
             this.line.draw();
             this.line.update();

             this.points.drawScore( game.ball.score.current );
         };

         this.over = function() {
             var iCurrentScore = game.ball.score.current;

             window.cancelAnimationFrame( this.animationRequestID );

             this.ended = true;

             game.gameOver.draw();
             game.gameOver.drawScore( iCurrentScore );
         };

         this.init = function() {
             if ( !this.eventsSetted ) {
                 this.app.canvas.addEventListener( "click", this.ball.update.bind( this.ball ) );
                 window.addEventListener( "keyup", this.ball.update.bind( this.ball ) );

                 this.app.canvas.addEventListener( "click", this.line.update.bind( this.line ) );
                 window.addEventListener( "keyup", this.line.update.bind( this.line ) );

                 this.eventsSetted = true;
             }

             this.started = false;
             this.ended = false;
             this.line.init();
             this.ball.init();
             this.time.start = Date.now();

             this.animate();
         };

         // Load spriteSheet
         this.spriteSheet = new Image();
         this.spriteSheet.addEventListener( "load", this.init.bind( this ) );
         this.spriteSheet.src = "./resources/sprite.png";
     };

     window.Cadenas = Cadenas;

 } )();
