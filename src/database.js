import GlobalStore from "./stores/store.js";

export function getStore() {
  let store = new GlobalStore();
  function DebugAdd() {
    console.error("ABS1", store.substores.NumberStore.currentNumber);
    store.substores.NumberStore.add();
    console.error("ABS2", store.substores.NumberStore.currentNumber);
  }
  let data = "Det är inte bara vid datum med efterföljande månadsangivelse som det räcker med rena siffror för att ange ordningstal. Även i andra sammanhang kan det bli aktuellt. En av mina böcker har just kommit ut i en femte upplaga. Detta kan i formella sammanhang skrivas: 5 uppl. Skrivsättet används allmänt på böckers titelsidor och i uppgifter inom parentes i recensioner till exempel.";

  // store.substores.SapisStore.analyzeText(data);

  return store;
}

// Old stuff
// console.log("TEST", mobx.isObservableProp(GlobalStore.substores["NumberStore"], "currentNumber"));

// GlobalStore.substores.NumberStore.currentNumber = 0;
// GlobalStore.resetState();

// console.log("VAL", GlobalStore.substores.NumberStore.currentNumber);

/* // GlobalStore.substores.TextStore.currentText = "Test";
DebugAdd();
// console.log("DONE!1", _.cloneDeep(GlobalStore.substores.TextStore), _.cloneDeep(GlobalStore.substores.NumberStore));
DebugAdd();
GlobalStore.substores.TextStore.setText("text: string");
GlobalStore.substores.TextStore.setText("text: string2");
// console.log("DONE!2", _.cloneDeep(GlobalStore.substores.TextStore), _.cloneDeep(GlobalStore.substores.NumberStore));
GlobalStore.substores.NumberStore.add();
// GlobalStore.substores.NumberStore.add();
console.log("Done adding!\nReseting!");
console.log("DONE!3", _.cloneDeep(GlobalStore.substores.TextStore), _.cloneDeep(GlobalStore.substores.NumberStore));
// GlobalStore.resetState();
// GlobalStore.resetState();
// console.log("DONE!", GlobalStore.substores.UndoStore);
*/
/*
var test = { number: 10 };

var map = new Map().set("testvalue", test);
console.log(map.get("testvalue"));
test.number = 5;
console.log(map.get("testvalue"));
*/
/*
class Timer {
  constructor() {
    this.start = Date.now();
    this.current = Date.now();
  }

  get elapsedTime() {
    return this.current - this.start + "milliseconds";
  }

  tick() {
    this.current = Date.now();
  }
}
mobx.decorate(Timer, {
  start: mobx.observable,
  current: mobx.observable,
  elapsedTime: mobx.computed,
  tick: mobx.action
});

class ObservableTodoStore {
  constructor() {
    this.todos = []; // @observable
    this.pendingRequests = 0; // @observable
    mobx.autorun(() => console.log(this.report));
  }

  get completedTodosCount() { // @computed
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() { // @computed
    if (this.todos.length === 0) { return "<none>"; }
    return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

mobx.decorate(ObservableTodoStore, {
  todos: mobx.observable,
  pendingRequests: mobx.observable,
  completedTodosCount: mobx.computed,
  report: mobx.computed
});

const observableTodoStore = new ObservableTodoStore();

observableTodoStore.addTodo("read MobX tutorial");
observableTodoStore.addTodo("try MobX");
observableTodoStore.todos[0].completed = false;
observableTodoStore.todos[1].task = "try MobX in own project";
observableTodoStore.todos[0].task = "grok MobX tutorial";

class Users {
  constructor(users) {
    // @observable
    this.users = users;
    mobx.autorun(() => console.log(this.dump()));
  }

  // @computed
  dump() {
    return this.users;
  }

  // @computed
  get activeUsers() {
    return this.users.filter(user => user.active);
  }
}
mobx.decorate(Users, {
  activeUsers: mobx.computed,
  users: [json, mobx.observable]
});

const userStore = new Users([]);

userStore.users.push({ name: "Test", active: true });
userStore.users[0].active = false;
console.log("Get", userStore.activeUsers);

class GlobalStore {
  constructor() {
    // After this global store class is instatiated via the constructor function,  map the substores to this object
    // @observable
    this.substores = mapStores(subStores);

    var { UiStore, UndoStore } = this.substores; // you can even deconstruct the state immidiately after instantiation,

    reaction(() => this.snapshot, this.pushSnapshotAndSave); // and bind reactions to the global actions below

    reaction(() => UndoStore.snapshots.length > 1, (bool) => UiStore.displayUndo = bool); // or bind reactions to and from the substores

    when(() => UiStore.loggedIn, this.displayUser); // this, referring to the GlobalStore and the methods bound to it
  }

  // ... // all other actions

  resetState() {
    let { UndoStore, UiStore, ColorStore } = this.substores;
    let lastSnapshot = UndoStore.snapshots.length > 1 && UndoStore.snapshots[1];
    if (lastSnapshot) {
      UiStore.autoSaveDrafts = false;

      // here is where the entire application state is reset based on the last snapshot, see Snapshot.js
      this.substores = resetSnapshot(lastSnapshot, this.substores);

      UndoStore.popSnapshot();
      UiStore.autoSaveDrafts = true;
    }
  }
}

/*
const todoStore = new TodoStore();
todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());

todoStore.addTodo("try MobX");
console.log(todoStore.report());

todoStore.todos[0].completed = true;
console.log(todoStore.report());

todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());

todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report()); */
