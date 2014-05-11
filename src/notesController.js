import {Inject, Controller, Scope} from 'diWrapper/annotations';

@Controller('NotesController')
@Inject('$scope')
export class NotesController {
  constructor($scope) {
    this.$scope = $scope;
    this.init();
  }

  init() {
    this.$scope.noteText = 'Write a new note here!';
  }

  @Scope
  clear() {
    this.$scope.noteText = '';
  }
}
