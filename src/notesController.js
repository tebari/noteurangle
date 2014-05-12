import {Inject, Controller, Scope} from 'diWrap';

@Controller('NotesController')
@Inject('$scope')
class NotesController {
  constructor($scope) {
    this.$scope = $scope;
    this.init();
  }

  init() {
    this.$scope.notes = [];
    this.$scope.noteText = 'Write a new note here!';
  }

  @Scope
  clear() {
    this.$scope.noteText = '';
    this.$scope.notes.length = 0;
  }

  @Scope
  add() {
    var text = this.$scope.noteText;
    if (!this.$scope.noteText) {
      return;
    }

    this.$scope.notes.push({
      text: text
    });
    this.$scope.noteText = '';
  }
}

export default NotesController;
