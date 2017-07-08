(function() {
  'use strict';

  angular.module('words').factory('dictionaryManager', ['$log', 'wordEndpoint', 'config', 'userService',
   function($log, wordEndpoint, config, userService) {
    var imageUrl = config.apiUrl + '/image';

    var dictionaryUrl, words;

    function find(word) {
      return _.find(words, function(current) {
        return current.word === word;
      });
    };

    return {
      load: function(category) {
        dictionaryUrl = config.apiUrl + '/dictionary/' + userService.get() + '/' + category;
        words = wordEndpoint.load(dictionaryUrl);
        return words;
      },
      getWords: function() {
        return words;
      },
      save: function(word, translation) {
        var wordCard = find(word);
        if(wordCard) {
          if(wordCard.translation.indexOf(translation) === -1) {
            wordCard.translation.push(translation);
            wordEndpoint.patch(dictionaryUrl, {'word': word, 'translation': translation});
          }
        } else {
          wordEndpoint.post(dictionaryUrl, {
            'word': word,
            'translation': translation
          }).$promise.then(function(response) {
            words.unshift(response);
          });
        }
      },
      remove: function(wordsToRemove) {
        wordsToRemove.forEach(function(elem) {
          var index = words.indexOf(elem);
          if(index !== -1) {
            wordEndpoint.delete(dictionaryUrl + '/' + elem.word).then(function(res) {
              if(!res.success) {
                $log.error('Error has occured %s', res.err);
              }
            });
            words.splice(index, 1);
          }
        });
      },
      addTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard && wordCard.translation.indexOf(translation) === -1) {
          wordEndpoint.patch(dictionaryUrl, {'word': word, 'translation': translation}).then(function(res) {
            if(!res.success) {
              $log.error('Error has occured %s', res.err);
            }
          });
          wordCard.translation.push(translation);
        }
      },
      removeTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard) {
          wordCard.translation = _.without(wordCard.translation, translation).then(function(res) {
            if(!res.success) {
              $log.error('Error has occured %s', res.err);
            }
          });
          wordEndpoint.delete(dictionaryUrl + '/' + word + '/' + translation);
        }
      },
      uploadImg: function(word, img) {
        var wordCard = find(word);
        if(wordCard) {
          return wordEndpoint.uploadImg(imageUrl + '/' + wordCard.word, img).$promise.then(function(res) {
            wordCard.imageUrl = res.url + '?' + Date.now();
          });
        }
      }
    };
  }]);
}());
