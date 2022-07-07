'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

var Level = /*#__PURE__*/function () {
  function Level(width, height, type) {
    _classCallCheck(this, Level);

    _defineProperty(this, "active", false);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "children", []);

    _defineProperty(this, "entities", []);

    _defineProperty(this, "parent", undefined);

    _defineProperty(this, "monsterCount", 0);

    _defineProperty(this, "tileDictionary", []);

    _defineProperty(this, "breedDictionary", []);

    this.type = type;

    if (width < 1) {
      throw new Error('width must be greater than 0');
    }

    if (height < 1) {
      throw new Error('height must be greater than 0');
    }

    this.width = width;
    this.height = height;
    this.tiles = new Array(width * height);
  }

  _createClass(Level, [{
    key: "boundsGuard",
    value: function boundsGuard(x, y) {
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return x < offset || x >= this.width - offset || y < offset || y >= this.height - offset;
    }
  }, {
    key: "generate",
    value: function generate() {
      this.type.generate(this);
    }
  }, {
    key: "placeEntity",
    value: function placeEntity(x, y, entity) {
      var deep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (this.boundsGuard(x, y)) {
        throw Level.boundsError;
      } // is target in a child level?


      var child = this.getChildAt(x, y);

      if (child) {
        if (deep) {
          child.placeEntity(x - child.x, y - child.y, entity, deep);
        } else {
          throw new Error('cannot place entity in a child level without `deep = true`');
        }
      } else {
        this.entities.push(entity);
      }
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);

      if (index === -1) {
        throw new Error('entity is not in this level');
      }

      this.entities.splice(index, 1);
    }
  }, {
    key: "translateForChild",
    value: function translateForChild(x, y, child) {
      if (child.parent !== this) {
        throw new Error('child is not a child of this level');
      }

      return {
        x: x - child.x,
        y: y - child.y
      };
    }
  }, {
    key: "translateForParent",
    value: function translateForParent(x, y) {
      if (!this.parent) {
        return {
          x: x,
          y: y
        };
      }

      return {
        x: x + this.x,
        y: y + this.y
      };
    }
  }, {
    key: "activeChild",
    get: function get() {
      var _iterator = _createForOfIteratorHelper(this.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          if (child.active) {
            return child;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return undefined;
    },
    set: function set(child) {
      var _iterator2 = _createForOfIteratorHelper(this.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;
          c.active = c === child;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "deactiveChild",
    value: function deactiveChild() {
      var _iterator3 = _createForOfIteratorHelper(this.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;

          if (child.active) {
            child.active = false;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this.parent;
    }
    /**
     * Return an array of all active child levels, in order of their appearance in the
     * tree.
     * @returns An array of all the active child levels.
     */

  }, {
    key: "getActiveChildStack",
    value: function getActiveChildStack() {
      var stack = [];

      var _iterator4 = _createForOfIteratorHelper(this.children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var child = _step4.value;

          if (child.active) {
            stack.push(child);
            stack.push.apply(stack, _toConsumableArray(child.getActiveChildStack()));
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return stack;
    }
  }, {
    key: "getDeepestActiveChild",
    value: function getDeepestActiveChild() {
      var stack = this.getActiveChildStack();
      return stack.length ? stack[stack.length - 1] : this;
    }
  }, {
    key: "getTile",
    value: function getTile(x, y) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.boundsGuard(x, y)) {
        throw Level.boundsError;
      } // is target in a child level?


      var child = this.getChildAt(x, y);

      if (child) {
        if (deep) {
          return child.getTile(x - child.x, y - child.y, deep);
        }
      } else {
        return this.tiles[y * this.width + x];
      }
    }
  }, {
    key: "setTile",
    value: function setTile(x, y, tile) {
      var deep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      // throw if out of bounds
      if (this.boundsGuard(x, y)) {
        throw Level.boundsError;
      } // is target in a child level?


      var child = this.getChildAt(x, y);

      if (child) {
        if (deep) {
          child.setTile(x - child.x, y - child.y, tile, deep);
        } else {
          throw new Error('cannot place tile in a child level without `deep = true`');
        }
      } else {
        this.tiles[y * this.width + x] = tile;
      }
    }
  }, {
    key: "getChildAt",
    value: function getChildAt(x, y) {
      var _iterator5 = _createForOfIteratorHelper(this.children),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var child = _step5.value;

          if (x >= child.x && x < child.x + child.width && y >= child.y && y < child.y + child.height) {
            return child;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return undefined;
    }
  }, {
    key: "addChild",
    value: function addChild(x, y, level) {
      // TODO: Make sure children cant be placed at the edges of the level. That way we dont have to think about transiting entities accross multiple levels, assuming we also disallow moves greater than one tile.
      var width = level.width;
      var height = level.height; // x must be > 0 and x + width must be < this.width

      if (x < 1 || x + width > this.width - 1) {
        throw new Error('x must be between 1 and width - 1');
      } // y must be > 0 and y + height must be < this.height


      if (y < 1 || y + height > this.height - 1) {
        throw new Error('y must be between 1 and height - 1');
      }

      var otherChildLevelAtTile = this.getChildAt(x, y);

      if (otherChildLevelAtTile) {
        throw new Error('cannot add child at tile that already has a child');
      }

      level.parent = this;
      level.x = x;
      level.y = y;
      this.children.push(level);
    }
  }, {
    key: "getTileContent",
    value: function getTileContent(x, y) {
      var child = this.getChildAt(x, y);

      if (child) {
        return child.getTileContent(x - child.x, y - child.y);
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

_defineProperty(Level, "boundsError", new Error('coordinates are out of bounds'));

var randomInt = function randomInt() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return Math.floor(Math.random() * max);
};

var LevelType = /*#__PURE__*/function () {
  function LevelType(name, tileTypes, breeds, maxMonsters) {
    _classCallCheck(this, LevelType);

    this.name = name;
    this.tileTypes = tileTypes;
    this.breeds = breeds;
    this.maxMonsters = maxMonsters;
  }

  _createClass(LevelType, [{
    key: "generate",
    value: function generate(level) {
      level.tileDictionary = this.tileTypes.map(function (tileType) {
        return {
          type: tileType.type
        };
      });
      level.breedDictionary = this.breeds.map(function (breed) {
        return {
          breed: breed.breed,
          maxSpawns: breed.maxSpawns,
          spawnChance: breed.spawnChance
        };
      });
      this.placeTiles(level);
      this.placeMonsters(level);
    }
  }, {
    key: "placeTiles",
    value: function placeTiles(level) {
      // border level with walls
      for (var x = 0; x < level.width; x++) {
        var tile = this.getObstacleTile(level);
        level.setTile(x, 0, tile);
        level.setTile(x, level.height - 1, tile);
      }

      for (var y = 0; y < level.height; y++) {
        var _tile = this.getObstacleTile(level);

        level.setTile(0, y, _tile);
        level.setTile(level.width - 1, y, _tile);
      } // fill level with floor


      for (var _x = 1; _x < level.width - 1; _x++) {
        for (var _y = 1; _y < level.height - 1; _y++) {
          var _tile2 = this.getPassableTile(level);

          level.setTile(_x, _y, _tile2);
        }
      }
    }
  }, {
    key: "getObstacleTile",
    value: function getObstacleTile(level) {
      // get unpassble tiles from level tile dictionary
      var unpassableTiles = level.tileDictionary.filter(function (tileType) {
        return tileType.type.passable === false;
      }); // get random tile from unpassable tiles

      var randomTile = unpassableTiles[randomInt(unpassableTiles.length)];
      return new Tile(randomTile.type);
    }
  }, {
    key: "getPassableTile",
    value: function getPassableTile(level) {
      // get passable tiles from level tile dictionary
      var passableTiles = level.tileDictionary.filter(function (tileType) {
        return tileType.type.passable === true;
      }); // get random tile from passable tiles

      var randomTile = passableTiles[randomInt(passableTiles.length)];
      return new Tile(randomTile.type);
    }
  }, {
    key: "placeMonsters",
    value: function placeMonsters(level) {
      while (level.monsterCount < this.maxMonsters) {
        var _level$getTileContent;

        var x = randomInt(level.width - 2) + 1;
        var y = randomInt(level.height - 2) + 1;
        var maxIters = 100; // while no entity at this position

        var entities = (_level$getTileContent = level.getTileContent(x, y)) === null || _level$getTileContent === void 0 ? void 0 : _level$getTileContent.entities;

        while (entities && entities.length > 0 && maxIters) {
          var _level$getTileContent2;

          x = randomInt(level.width);
          y = randomInt(level.height);
          entities = (_level$getTileContent2 = level.getTileContent(x, y)) === null || _level$getTileContent2 === void 0 ? void 0 : _level$getTileContent2.entities;
          maxIters--;
        }

        var monster = this.getMonster(x, y, level); // should not happen

        level.monsterCount++;
        if (!monster) continue;
        level.placeEntity(x, y, monster);
        monster.spawn();
      }
    }
  }, {
    key: "getMonster",
    value: function getMonster(x, y, level) {
      // get all breeds from dictionary that have maxSpawns > 0
      var breeds = level.breedDictionary.filter(function (breed) {
        return breed.maxSpawns > 0;
      }); // get sum of all spanshChances

      var totalSpawnChance = breeds.reduce(function (total, breed) {
        return total + breed.spawnChance;
      }, 0); // if there are no breeds or totalSpawnChance is 0, return undefined

      if (totalSpawnChance === 0) return undefined; // get random number between 0 and totalSpawnChance

      var random = Math.random() * totalSpawnChance; // loop through breeds, accumulating spawnChance until random is reached

      var currentSpawnChance = 0;

      var _iterator = _createForOfIteratorHelper(breeds),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var breed = _step.value;
          currentSpawnChance += breed.spawnChance;

          if (random < currentSpawnChance) {
            breed.maxSpawns--;
            return new Monster('monster', x, y, breed.breed);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return LevelType;
}();

var Tile = /*#__PURE__*/_createClass(function Tile(type) {
  _classCallCheck(this, Tile);

  this.type = type;
});

var TileType = /*#__PURE__*/_createClass(function TileType(name, passable) {
  _classCallCheck(this, TileType);

  this.name = name;
  this.passable = passable;
});

// TODO: Implement Typed Object?
var Item = /*#__PURE__*/_createClass(function Item(name, drawAction, playAction, discardAction) {
  _classCallCheck(this, Item);

  this.name = name;

  if (name.length < 1) {
    throw new Error('name must be at least 1 character long');
  }

  this.drawAction = drawAction;
  this.playAction = playAction;
  this.discardAction = discardAction;
});

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var Session = /*#__PURE__*/function () {
  function Session(root, player) {
    var logging = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Session);

    this.root = root;
    this.player = player;
    this.logging = logging;

    if (!root) {
      throw new Error('level must be provided');
    }

    this.root.entities.push(player);
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  _createClass(Session, [{
    key: "log",
    value: function log() {
      if (this.logging) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "activeLevel",
    get: function get() {
      var _this$root$getDeepest;

      return (_this$root$getDeepest = this.root.getDeepestActiveChild()) !== null && _this$root$getDeepest !== void 0 ? _this$root$getDeepest : this.root;
    }
    /**
     * Make a turn in the game.
     */

  }, {
    key: "takeTurn",
    value: function () {
      var _takeTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var level, _iterator, _step, _entity2, action, result, i, entity, x, y, childLevel, _i, _entity, _x, _y, parentLevel;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                level = this.activeLevel;

                if (level) {
                  _context.next = 3;
                  break;
                }

                throw new Error('No active level');

              case 3:
                _iterator = _createForOfIteratorHelper(level.entities);
                _context.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 15;
                  break;
                }

                _entity2 = _step.value;
                _context.next = 10;
                return _entity2.takeTurn(level);

              case 10:
                action = _context.sent;
                result = action.use(_entity2);
                this.log("".concat(_entity2.name, " used ").concat(action.name, " ").concat(result.success ? 'successfully' : 'unsuccessfully').concat(result.reason ? ": ".concat(result.reason) : ''));

              case 13:
                _context.next = 6;
                break;

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](4);

                _iterator.e(_context.t0);

              case 20:
                _context.prev = 20;

                _iterator.f();

                return _context.finish(20);

              case 23:
                i = level.entities.length - 1;

              case 24:
                if (!(i >= 0)) {
                  _context.next = 38;
                  break;
                }

                entity = level.entities[i]; // get its position

                x = entity.x, y = entity.y; // get the child level at that position

                childLevel = level.getChildAt(x, y);

                if (childLevel) {
                  _context.next = 30;
                  break;
                }

                return _context.abrupt("continue", 35);

              case 30:
                // remove the entity from the level
                level.entities.splice(i, 1); // change coordinates to the child level

                entity.x = x - childLevel.x;
                entity.y = y - childLevel.y; // add the entity to the child level

                childLevel.entities.push(entity);

                if (entity.isPlayer) {
                  childLevel.active = true;
                }

              case 35:
                i--;
                _context.next = 24;
                break;

              case 38:
                _i = level.entities.length - 1;

              case 39:
                if (!(_i >= 0)) {
                  _context.next = 53;
                  break;
                }

                _entity = level.entities[_i]; // get its position

                _x = _entity.x, _y = _entity.y; // get the parent level at that position

                parentLevel = level.getParent();

                if (parentLevel) {
                  _context.next = 45;
                  break;
                }

                return _context.abrupt("continue", 50);

              case 45:
                // remove the entity from the level
                level.entities.splice(_i, 1); // change coordinates to the parent level

                _entity.x = _x + parentLevel.x;
                _entity.y = _y + parentLevel.y; // add the entity to the parent level

                parentLevel.entities.push(_entity);

                if (_entity.isPlayer) {
                  parentLevel.deactiveChild();
                }

              case 50:
                _i--;
                _context.next = 39;
                break;

              case 53:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 17, 20, 23]]);
      }));

      function takeTurn() {
        return _takeTurn.apply(this, arguments);
      }

      return takeTurn;
    }()
  }, {
    key: "start",
    value: function start() {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "end",
    value: function end() {
      throw new Error('Method not implemented.');
    }
  }]);

  return Session;
}();

var Player = /*#__PURE__*/function () {
  function Player(name, x, y) {
    _classCallCheck(this, Player);

    _defineProperty(this, "isPlayer", true);

    _defineProperty(this, "isAlive", true);

    this.name = name;
    this.x = x;
    this.y = y;

    if (name.length < 1) {
      throw new Error('name must be at least 1 character long');
    }
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(Player, [{
    key: "takeTurn",
    value: function () {
      var _takeTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(level) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Method not implemented.');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function takeTurn(_x) {
        return _takeTurn.apply(this, arguments);
      }

      return takeTurn;
    }()
  }]);

  return Player;
}();

var Monster = /*#__PURE__*/function () {
  function Monster(name, x, y, breed) {
    _classCallCheck(this, Monster);

    _defineProperty(this, "isPlayer", false);

    _defineProperty(this, "health", 0);

    this.name = name;
    this.x = x;
    this.y = y;
    this.breed = breed;

    if (name.length < 1) {
      throw new Error('name must be at least 1 character long');
    }
  }

  _createClass(Monster, [{
    key: "spawn",
    value: function spawn() {
      this.breed.spawn(this);
    }
  }, {
    key: "takeTurn",
    value: function () {
      var _takeTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(level) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.breed.takeTurn(this, level));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function takeTurn(_x) {
        return _takeTurn.apply(this, arguments);
      }

      return takeTurn;
    }()
  }]);

  return Monster;
}();

var Breed = /*#__PURE__*/function () {
  function Breed(name, maxHealth, items, loot) {
    _classCallCheck(this, Breed);

    this.name = name;
    this.maxHealth = maxHealth;
    this.items = items;
    this.loot = loot;
  }

  _createClass(Breed, [{
    key: "takeTurn",
    value: function takeTurn(monster, level) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "spawn",
    value: function spawn(monster) {
      monster.health = this.maxHealth;
    }
  }]);

  return Breed;
}();

exports.Breed = Breed;
exports.Item = Item;
exports.Level = Level;
exports.LevelType = LevelType;
exports.Monster = Monster;
exports.Player = Player;
exports.Session = Session;
exports.Tile = Tile;
exports.TileType = TileType;
