game.GameOver = me.Stage.extend({
  /**
   * action to perform on state change
   */
  onResetEvent: function() {
    me.game.world.addChild(
      new (me.Renderable.extend({
        // constructor
        init: function() {
          this._super(me.Renderable, 'init', [
            0,
            0,
            me.game.viewport.width,
            me.game.viewport.height
          ]);

          // font for the scrolling text
          this.font = new me.BitmapFont(
            me.loader.getBinary('PressStart2P'),
            me.loader.getImage('PressStart2P')
          );
        },

        update: function(dt) {
          return true;
        },

        draw: function(renderer) {
          this.font.draw(
            renderer,
            'YOU WON',
            me.game.viewport.width,
            me.game.viewport.height
          );
        }
      }))(),
      5
    );

    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
    me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function(
      action,
      keyCode,
      edge
    ) {
      if (action === 'enter') {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play('cling');
        // // start the game
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.change(me.state.PLAY);
      }
    });
  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.pointer.LEFT);
    me.event.unsubscribe(this.handler);
  }
});
