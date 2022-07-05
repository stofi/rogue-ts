function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Player = /*#__PURE__*/function () {
  function Player(name, x, y) {
    _classCallCheck(this, Player);

    this.name = name;
    this.x = x;
    this.y = y;
  }

  _createClass(Player, [{
    key: "takeTurn",
    value: function takeTurn() {
      throw new Error('Method not implemented.');
    }
  }]);

  return Player;
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Monster = /*#__PURE__*/function () {
  function Monster(name, x, y, breed) {
    _classCallCheck(this, Monster);

    _defineProperty(this, "health", 0);

    this.name = name;
    this.x = x;
    this.y = y;
    this.breed = breed;
  }

  _createClass(Monster, [{
    key: "takeTurn",
    value: function takeTurn() {
      throw new Error('Method not implemented.');
    }
  }]);

  return Monster;
}();

var Drop = /*#__PURE__*/_createClass(function Drop(name, x, y, item) {
  _classCallCheck(this, Drop);

  this.name = name;
  this.x = x;
  this.y = y;
  this.item = item;
});

var Item = /*#__PURE__*/_createClass(function Item(name, drawAction, playAction, discardAction) {
  _classCallCheck(this, Item);

  this.name = name;
  this.drawAction = drawAction;
  this.playAction = playAction;
  this.discardAction = discardAction;
});

var Level = /*#__PURE__*/_createClass(function Level(width, height, tiles) {
  _classCallCheck(this, Level);

  this.width = width;
  this.height = height;
  this.tiles = tiles;
});

var Tile = /*#__PURE__*/_createClass(function Tile() {
  _classCallCheck(this, Tile);
});

export { Drop, Item, Level, Monster, Player, Tile };
