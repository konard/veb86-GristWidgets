/**
 * Модуль пользовательского интерфейса для редактируемой таблицы
 *
 * Этот модуль управляет отображением интерфейса, включая таблицу,
 * настройки и обработку пользовательских взаимодействий.
 *
 * @module UIModule
 */

var UIModule = (function() {
  'use strict';

  // ========================================
  // ПРИВАТНЫЕ ПЕРЕМЕННЫЕ
  // ========================================

  var $tableSelect = null; // Элемент выбора таблицы
  var $table = null; // Элемент таблицы
  var $tableHeader = null; // Заголовок таблицы
  var $tableBody = null; // Тело таблицы
  var $status = null; // Элемент статуса
  var $addRecordBtn = null; // Кнопка добавления записи

  // ========================================
  // ИНИЦИАЛИЗАЦИЯ
  // ========================================

  /**
   * Инициализировать модуль UI
   */
  function initialize() {
    $tableSelect = $('#table-select');
    $table = $('#editable-table');
    $tableHeader = $('#table-header');
    $tableBody = $('#table-body');
    $status = $('#status-text');
    $addRecordBtn = $('#add-record-btn');

    // Привязываем обработчики событий
    bindEvents();

    console.log('UI модуль инициализирован');
  }

  /**
   * Привязать обработчики событий
   */
  function bindEvents() {
    $tableSelect.on('change', function() {
      var tableId = $(this).val();
      ConfigModule.setSelectedTableId(tableId);
      AppModule.loadSelectedTable();
    });

    $addRecordBtn.on('click', function() {
      addNewRecord();
    });
  }

  // ========================================
  // ОТОБРАЖЕНИЕ СПИСКА ТАБЛИЦ
  // ========================================

  /**
   * Заполнить список таблиц
   *
   * @param {Array} tables - Список таблиц
   */
  function populateTableSelect(tables) {
    $tableSelect.empty();
    $tableSelect.append($('<option>', {
      value: '',
      text: 'Выберите таблицу'
    }));

    tables.forEach(function(table) {
      $tableSelect.append($('<option>', {
        value: table.id,
        text: table.tableId
      }));
    });

    // Скрываем кнопку добавления, пока таблица не выбрана
    $addRecordBtn.hide();

    console.log('Список таблиц обновлен');
  }

  // ========================================
  // ОТОБРАЖЕНИЕ ДАННЫХ ТАБЛИЦЫ
  // ========================================

  /**
   * Отобразить данные таблицы
   *
   * @param {Object} tableData - Данные таблицы из Grist
   */
  function displayTableData(tableData) {
    clearTable();

    if (isTableEmpty(tableData)) {
      displayEmptyTable();
      return;
    }

    var fieldNames = getFieldNames(tableData);
    createTableHeaders(fieldNames);
    createTableRows(tableData, fieldNames);
    initializeTabledit(fieldNames);
    showAddButton();

    console.log('Данные таблицы отображены');
  }

  /**
   * Очистить таблицу от предыдущих данных
   */
  function clearTable() {
    $tableHeader.empty();
    $tableBody.empty();
  }

  /**
   * Проверить, пуста ли таблица
   *
   * @param {Object} tableData - Данные таблицы
   * @returns {boolean} true, если таблица пуста
   */
  function isTableEmpty(tableData) {
    return !tableData || !tableData.id || tableData.id.length === 0;
  }

  /**
   * Отобразить пустую таблицу
   */
  function displayEmptyTable() {
    $tableHeader.append('<th>Нет данных</th>');
    $tableBody.append('<tr><td>Таблица пуста</td></tr>');
  }

  /**
   * Получить список полей таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @returns {Array} Список имен полей
   */
  function getFieldNames(tableData) {
    return Object.keys(tableData).filter(function(key) {
      return key !== 'id' && key !== 'manualSort';
    });
  }

  /**
   * Создать заголовки таблицы
   *
   * @param {Array} fieldNames - Список имен полей
   */
  function createTableHeaders(fieldNames) {
    var $headerRow = $('<tr>');
    $headerRow.append('<th>ID</th>');
    fieldNames.forEach(function(fieldName) {
      $headerRow.append('<th>' + fieldName + '</th>');
    });
    $tableHeader.append($headerRow);
  }

  /**
   * Создать строки данных таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @param {Array} fieldNames - Список имен полей
   */
  function createTableRows(tableData, fieldNames) {
    for (var i = 0; i < tableData.id.length; i++) {
      var $row = createTableRow(tableData, fieldNames, i);
      $tableBody.append($row);
    }
  }

  /**
   * Создать одну строку таблицы
   *
   * @param {Object} tableData - Данные таблицы
   * @param {Array} fieldNames - Список имен полей
   * @param {number} index - Индекс строки
   * @returns {jQuery} jQuery объект строки
   */
  function createTableRow(tableData, fieldNames, index) {
    var $row = $('<tr>');
    $row.attr('data-id', tableData.id[index]);
    $row.append('<td>' + tableData.id[index] + '</td>');

    fieldNames.forEach(function(fieldName) {
      var value = tableData[fieldName] ? tableData[fieldName][index] : '';
      $row.append('<td>' + (value || '') + '</td>');
    });

    return $row;
  }

  /**
   * Показать кнопку добавления записи
   */
  function showAddButton() {
    $addRecordBtn.show();
  }

  /**
   * Инициализировать Tabledit для редактирования таблицы
   *
   * @param {Array} fieldNames - Список имен полей
   */
  function initializeTabledit(fieldNames) {
    // Удаляем предыдущую инициализацию, если есть
    if ($table.hasClass('tabledit')) {
      $table.tabledit('destroy');
    }

    // Настраиваем колонки для редактирования (исключаем ID)
    var columns = {
      identifier: [0, 'id'], // ID колонка
      editable: []
    };

    fieldNames.forEach(function(fieldName, index) {
      columns.editable.push([index + 1, fieldName]); // +1 потому что ID колонка первая
    });

    // Инициализируем Tabledit
    $table.tabledit({
      url: '', // Не используем URL, обрабатываем изменения вручную
      columns: columns,
      onDraw: function() {
        console.log('Tabledit инициализирован');
      },
      onSuccess: function(data, textStatus, jqXHR) {
        // Обработка успешного сохранения
        console.log('Изменения сохранены:', data);
        updateStatus('Изменения сохранены');
      },
      onFail: function(jqXHR, textStatus, errorThrown) {
        console.error('Ошибка сохранения:', errorThrown);
        updateStatus('Ошибка сохранения: ' + errorThrown);
      },
      onAjax: function(action, serialize) {
        // Перехватываем AJAX запросы и обрабатываем вручную
        handleTableEdit(action, serialize);
        return false; // Предотвращаем отправку AJAX
      }
    });
  }

  /**
   * Обработать изменения в таблице
   *
   * @param {string} action - Действие (edit, delete и т.д.)
   * @param {string} serialize - Сериализованные данные
   */
  function handleTableEdit(action, serialize) {
    console.log('Обработка изменения:', action, serialize);

    // Парсим данные
    var data = {};
    serialize.split('&').forEach(function(pair) {
      var parts = pair.split('=');
      data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    });

    var tableId = ConfigModule.getSelectedTableId();
    var recordId = parseInt(data.id);

    if (action === 'edit') {
      // Собираем изменения
      var changes = {};
      Object.keys(data).forEach(function(key) {
        if (key !== 'id' && key !== 'action') {
          changes[key] = data[key];
        }
      });

      // Сохраняем изменения
      GristAPIModule.saveRecordChanges(tableId, recordId, changes).then(function() {
        updateStatus('Изменения сохранены');
      }).catch(function(error) {
        updateStatus('Ошибка: ' + error.message);
      });

    } else if (action === 'delete') {
      // Удаляем запись
      GristAPIModule.deleteRecord(tableId, recordId).then(function() {
        updateStatus('Запись удалена');
        // Перезагружаем таблицу
        AppModule.loadSelectedTable();
      }).catch(function(error) {
        updateStatus('Ошибка: ' + error.message);
      });
    }
  }

  /**
   * Добавить новую запись
   */
  function addNewRecord() {
    var tableId = ConfigModule.getSelectedTableId();
    if (!tableId) {
      updateStatus('Сначала выберите таблицу');
      return;
    }

    // Получаем текущие данные для определения полей
    var currentData = GristAPIModule.getCurrentTableData();
    if (!currentData) {
      updateStatus('Нет данных таблицы');
      return;
    }

    // Получаем список полей
    var fieldNames = Object.keys(currentData).filter(function(key) {
      return key !== 'id' && key !== 'manualSort';
    });

    // Создаем объект с пустыми значениями
    var newRecord = {};
    fieldNames.forEach(function(field) {
      newRecord[field] = '';
    });

    // Добавляем запись
    GristAPIModule.addNewRecord(tableId, newRecord).then(function() {
      updateStatus('Новая запись добавлена');
      // Перезагружаем таблицу
      AppModule.loadSelectedTable();
    }).catch(function(error) {
      updateStatus('Ошибка добавления записи: ' + error.message);
    });
  }

  // ========================================
  // СТАТУС И СООБЩЕНИЯ
  // ========================================

  /**
   * Обновить статус
   *
   * @param {string} message - Сообщение статуса
   */
  function updateStatus(message) {
    if ($status) {
      $status.text(message);
      // Автоматически скрываем статус через 3 секунды
      setTimeout(function() {
        $status.text('');
      }, 3000);
    }
  }

  /**
   * Показать сообщение об ошибке
   *
   * @param {string} message - Сообщение об ошибке
   */
  function showError(message) {
    updateStatus('Ошибка: ' + message);
    console.error(message);
  }

  /**
   * Показать сообщение о загрузке
   *
   * @param {string} message - Сообщение о загрузке
   */
  function showLoading(message) {
    updateStatus(message || 'Загрузка...');
  }

  // ========================================
  // ЭКСПОРТ ПУБЛИЧНОГО API
  // ========================================

  return {
    initialize: initialize,
    populateTableSelect: populateTableSelect,
    displayTableData: displayTableData,
    updateStatus: updateStatus,
    showError: showError,
    showLoading: showLoading
  };
})();