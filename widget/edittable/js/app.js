/**
<<<<<<< HEAD
 * Главный модуль приложения для редактируемой таблицы
 *
 * Этот модуль координирует работу всех других модулей и управляет
 * основным потоком приложения.
=======
 * Главный модуль приложения
 *
 * Этот модуль инициализирует все компоненты виджета
 * и управляет общим потоком выполнения.
>>>>>>> origin/main
 *
 * @module AppModule
 */

<<<<<<< HEAD
var AppModule = (function() {
  'use strict';

  // ========================================
  // ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
=======
var AppModule = (function(UIModule, GristApiModule) {
  'use strict';

  // ========================================
  // ПУБЛИЧНЫЕ МЕТОДЫ
>>>>>>> origin/main
  // ========================================

  /**
   * Инициализировать приложение
<<<<<<< HEAD
   *
   * Эта функция вызывается при загрузке страницы и запускает
   * инициализацию всех модулей.
   */
  function initialize() {
    console.log('Инициализация приложения...');

    // Инициализируем модули в правильном порядке
    UIModule.initialize();
    ConfigModule.loadSettings();

    // Инициализируем Grist API
    GristAPIModule.initialize().then(function() {
      console.log('Grist API готов');

      // Загружаем список таблиц
      loadAvailableTables();

    }).catch(function(error) {
      console.error('Ошибка инициализации Grist API:', error);
      UIModule.showError('Не удалось подключиться к Grist: ' + error.message);
    });
  }

  // ========================================
  // ЗАГРУЗКА СПИСКА ТАБЛИЦ
  // ========================================

  /**
   * Загрузить список доступных таблиц
   */
  function loadAvailableTables() {
    UIModule.showLoading('Загрузка списка таблиц...');

    GristAPIModule.loadAvailableTables().then(function(tables) {
      UIModule.populateTableSelect(tables);
      UIModule.updateStatus('Список таблиц загружен');
    }).catch(function(error) {
      UIModule.showError('Не удалось загрузить список таблиц: ' + error.message);
    });
  }

  // ========================================
  // ЗАГРУЗКА ДАННЫХ ВЫБРАННОЙ ТАБЛИЦЫ
  // ========================================

  /**
   * Загрузить данные выбранной таблицы
   */
  function loadSelectedTable() {
    var tableId = ConfigModule.getSelectedTableId();

    if (!tableId) {
      UIModule.updateStatus('Выберите таблицу');
      return;
    }

    UIModule.showLoading('Загрузка данных таблицы...');

    GristAPIModule.loadTableData(tableId).then(function(tableData) {
      UIModule.displayTableData(tableData);
      UIModule.updateStatus('Таблица загружена');
    }).catch(function(error) {
      UIModule.showError('Не удалось загрузить данные таблицы: ' + error.message);
    });
=======
   */
  function initializeApp() {
    console.log('Инициализация виджета редактируемой таблицы...');

    // Инициализировать Grist API
    GristApiModule.initializeGrist();

    // Инициализировать пользовательский интерфейс
    UIModule.initializeUI();

    // Загрузить список таблиц
    // Добавим небольшую задержку, чтобы гарантировать готовность Grist API
    setTimeout(() => {
      UIModule.loadTables();
    }, 500);
>>>>>>> origin/main
  }

  // ========================================
  // ЭКСПОРТ ПУБЛИЧНОГО API
  // ========================================

  return {
<<<<<<< HEAD
    initialize: initialize,
    loadAvailableTables: loadAvailableTables,
    loadSelectedTable: loadSelectedTable
  };
})();

// ========================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ========================================

// Запускаем приложение при загрузке страницы
$(document).ready(function() {
  AppModule.initialize();
=======
    initializeApp: initializeApp
  };
})(UIModule, GristApiModule);

// Инициализировать приложение при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  AppModule.initializeApp();
>>>>>>> origin/main
});