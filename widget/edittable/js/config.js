/**
<<<<<<< HEAD
 * Модуль конфигурации виджета редактируемой таблицы
 *
 * Этот модуль управляет настройками виджета, такими как выбранная таблица.
=======
 * Модуль управления конфигурацией виджета редактируемой таблицы
 *
 * Этот модуль отвечает за хранение и управление настройками виджета.
 * Предоставляет API для получения и изменения конфигурации.
>>>>>>> origin/main
 *
 * @module ConfigModule
 */

var ConfigModule = (function() {
  'use strict';

  // ========================================
<<<<<<< HEAD
  // ПРИВАТНЫЕ ПЕРЕМЕННЫЕ
  // ========================================

  var selectedTableId = null; // ID выбранной таблицы
=======
  // КОНСТАНТЫ
  // ========================================

  // Значения по умолчанию
  var DEFAULT_PAGE_SIZE = 20;

  // ========================================
  // ПРИВАТНЫЕ ПЕРЕМЕННЫЕ
  // ========================================

  /**
   * Текущая конфигурация виджета
   */
  var config = {
    pageSize: DEFAULT_PAGE_SIZE
  };
>>>>>>> origin/main

  // ========================================
  // ПУБЛИЧНЫЕ МЕТОДЫ
  // ========================================

  /**
<<<<<<< HEAD
   * Получить ID выбранной таблицы
   *
   * @returns {string|null} ID выбранной таблицы или null, если не выбрана
   */
  function getSelectedTableId() {
    return selectedTableId;
  }

  /**
   * Установить ID выбранной таблицы
   *
   * @param {string} tableId - ID таблицы для выбора
   */
  function setSelectedTableId(tableId) {
    selectedTableId = tableId;
    console.log('Выбрана таблица:', tableId);
  }

  /**
   * Загрузить настройки из локального хранилища
   */
  function loadSettings() {
    // В будущем можно добавить сохранение настроек в localStorage
    console.log('Настройки загружены');
  }

  /**
   * Сохранить настройки в локальное хранилище
   */
  function saveSettings() {
    // В будущем можно добавить сохранение настроек в localStorage
    console.log('Настройки сохранены');
=======
   * Получить текущую конфигурацию
   *
   * Возвращает копию объекта конфигурации, чтобы избежать
   * случайных изменений извне.
   *
   * @returns {Object} Объект конфигурации
   */
  function getConfig() {
    return Object.assign({}, config);
  }

  /**
   * Получить значение конкретного поля конфигурации
   *
   * @param {string} fieldName - Имя поля
   * @returns {*} Значение поля или undefined
   */
  function getConfigValue(fieldName) {
    return config[fieldName];
  }

  /**
   * Установить значение конкретного поля конфигурации
   *
   * @param {string} fieldName - Имя поля
   * @param {*} value - Новое значение
   */
  function setConfigValue(fieldName, value) {
    if (config.hasOwnProperty(fieldName)) {
      config[fieldName] = value;
      console.log('Поле конфигурации обновлено:', fieldName, '=', value);
    }
>>>>>>> origin/main
  }

  // ========================================
  // ЭКСПОРТ ПУБЛИЧНОГО API
  // ========================================

  return {
<<<<<<< HEAD
    getSelectedTableId: getSelectedTableId,
    setSelectedTableId: setSelectedTableId,
    loadSettings: loadSettings,
    saveSettings: saveSettings
=======
    getConfig: getConfig,
    getConfigValue: getConfigValue,
    setConfigValue: setConfigValue
>>>>>>> origin/main
  };
})();