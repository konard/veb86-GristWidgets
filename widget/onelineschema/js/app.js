/**
 * Главный модуль приложения
 *
 * Этот модуль инициализирует все компоненты виджета
 * и управляет общим потоком выполнения.
 *
 * @module AppModule
 */

var AppModule = (function() {
  'use strict';

  // ========================================
  // ПРИВАТНЫЕ ПЕРЕМЕННЫЕ
  // ========================================

  let initialized = false;

  // ========================================
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // ========================================

  /**
   * Обновить схему на основе текущих данных
   */
  async function updateSchema() {
    const tableName = 'schema'; // Фиксированное имя таблицы

    try {
      const config = ConfigModule.getConfig();

      // Загружаем данные из фиксированной таблицы
      const data = await DataModule.loadData(tableName);

      // Отрисовываем схему
      SchemaModule.drawSchema(data, config);

      UIModule.showStatusMessage(`Схема успешно обновлена из таблицы "${tableName}"`, 'success');
    } catch (error) {
      console.error('Ошибка обновления схемы:', error);
      UIModule.showStatusMessage(`Ошибка обновления схемы: ${error.message}`, 'error');
    }
  }


  /**
   * Получить текущие настройки для сохранения
   */
  const getOptions = function() {
    const config = ConfigModule.getConfig();
    return {
      table: config.table,
      layout: config.layout,
      groupByFeeder: config.groupByFeeder,
      scale: config.scale
    };
  };


  // ========================================
  // ПУБЛИЧНЫЕ МЕТОДЫ
  // ========================================

  /**
   * Инициализировать приложение
   */
  async function initializeApp() {
    if (initialized) return;

    console.log('Инициализация виджета визуализации однолинейной схемы...');

    // Инициализируем UI
    UIModule.initializeUI();

    // Инициализируем Grist API
    grist.ready({
      requiredAccess: 'read table',
      onEditOptions: function(options) {
        // Обновляем конфигурацию
        ConfigModule.setConfig(options);
        // Обновляем схему
        updateSchema();
      }
    });

    // Подписываемся на изменения записей
    grist.onRecords(function(records, mapping) {
      console.log('Изменение записей:', records.length);

      // Обновляем схему
      updateSchema();
    });

    // Примечание: grist.onGetOption не требуется для виджетов этого типа

    // Загружаем начальные данные
    setTimeout(() => {
      updateSchema();
    }, 500);

    initialized = true;
  }

  // ========================================
  // ЭКСПОРТ ПУБЛИЧНОГО API
  // ========================================

  return {
    initializeApp: initializeApp
  };
})();

// Инициализировать приложение при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  AppModule.initializeApp();
});