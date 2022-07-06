'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var Level = /*#__PURE__*/function () {
  function Level(width, height, tiles) {
    _classCallCheck(this, Level);

    _defineProperty(this, "entities", []);

    _defineProperty(this, "children", []);

    this.width = width;
    this.height = height;
    this.tiles = tiles;

    if (width < 1) {
      throw new Error('width must be greater than 0');
    }

    if (height < 1) {
      throw new Error('height must be greater than 0');
    }
  }

  _createClass(Level, [{
    key: "getTile",
    value: function getTile(x, y) {
      if (x < 0 || x >= this.width) {
        throw new Error('x must be between 0 and width');
      }

      if (y < 0 || y >= this.height) {
        throw new Error('y must be between 0 and height');
      }

      return this.tiles[y * this.width + x];
    }
  }, {
    key: "getChildAt",
    value: function getChildAt(x, y) {
      var _iterator = _createForOfIteratorHelper(this.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          if (x >= child.x && x < child.x + child.w && y >= child.y && y < child.y + child.h) {
            return child;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return undefined;
    }
  }, {
    key: "addChild",
    value: function addChild(x, y, level) {
      var width = level.width;
      var height = level.height; // x must be >= 0 and x + width must be <= this.width

      if (x < 0 || x + width > this.width) {
        throw new Error('x must be between 0 and width');
      } // y must be >= 0 and y + height must be <= this.height


      if (y < 0 || y + height > this.height) {
        throw new Error('y must be between 0 and height');
      }

      var otherChildLevelAtTile = this.getChildAt(x, y);

      if (otherChildLevelAtTile) {
        throw new Error('cannot add child at tile that already has a child');
      }

      this.children.push({
        x: x,
        y: y,
        w: width,
        h: height,
        level: level
      });
    }
  }, {
    key: "getTileContent",
    value: function getTileContent(x, y) {
      var child = this.getChildAt(x, y);

      if (child) {
        return child.level.getTileContent(x - child.x, y - child.y);
      } // entities


      var tile = this.getTile(x, y);
      var entities = this.entities.filter(function (entity) {
        return entity.x === x && entity.y === y;
      });
      return {
        tile: tile,
        entities: entities,
        x: x,
        y: y
      };
    }
  }]);

  return Level;
}();

var Tile = /*#__PURE__*/_createClass(function Tile() {
  _classCallCheck(this, Tile);
});

exports.Drop = Drop;
exports.Item = Item;
exports.Level = Level;
exports.Monster = Monster;
exports.Player = Player;
exports.Tile = Tile;
