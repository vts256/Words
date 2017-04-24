(function() {
  'use strict';
  angular.module('words').controller('DictionaryModalCtrl', ['dictionaryManager', 'selectedWord',
  function(dictionaryManager, selectedWord) {
    var vm = this;

    vm.selectedWord = selectedWord;

    vm.addPopover = {
      templateUrl: 'common/modal/addTranslationPopover.html'
    };

    vm.addTranslation = function() {
      vm.addPopover.isOpen = false;
      dictionaryManager.addTranslation(vm.selectedWord.word, vm.addPopover.translation);
      vm.addPopover.translation = '';
    };

    vm.removeTranslation = function(translationIndex) {
      dictionaryManager.removeTranslation(vm.selectedWord.word, vm.selectedWord.translation[translationIndex]);
    };

  }]);
}());