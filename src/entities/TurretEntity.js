define(
  [
    "src/me",
    "src/entities/TurretTubeEntity",
    "src/explosion",
  ],
  function (
    me,
    TurretTubeEntity,
    explosion
  ) {
      
  var TurretEntity = me.ObjectEntity.extend({
    
    init: function (x, y, settings) {
      settings.image = "turret_body";
      settings.spritewidth = 64;
      
      this.parent(x + 32, y, settings);
      
      this.updateColRect(8, 48, 4, 76);
      
      this.collidable = true;
      this.tube = null;
      
      this.createTube(settings.z);
    },
    
    createTube: function (z) {
      this.tube = new TurretTubeEntity(this.pos.x - TurretTubeEntity.WIDTH, this.pos.y + 32, this);
      me.game.add(this.tube, z);
      me.game.sort();
    },
    
    onCollision: function (res, obj) {
      if (obj.name == "grenade") {
        explosion.create(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.z);
        me.game.remove(this.tube);
        me.game.remove(this);
        me.game.HUD.updateItemValue("points", 150);
      }
    },
    
  });
  
  return TurretEntity;
  
});