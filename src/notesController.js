import {Inject, Controller} from 'diWrapper/annotations';

@Controller('NotesController')
@Inject('$scope')
export function notesController($scope) {
  $scope.noteText = 'Write a note there!';
  $scope.clear = function () {
    $scope.noteText = '';
  };
}
