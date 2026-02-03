/**
 * Модуль конфигурации виджета managerCalc
 * Содержит константы и настройки для работы виджета
 */

const CONFIG = {
  // Название таблицы с устройствами (по умолчанию)
  TABLE_NAME: 'Table1', // Может быть переопределено через DataModule.setTableName()

  // Названия столбцов в таблице
  COLUMNS: {
    ID: 'id',
    DEVICE_NAME: 'deviceName',
    PARENT_ID: 'parentId',
    CAN_BE_HEAD: 'icanbeheadunit',
    ONLY_GU_PATH: 'onlyGUpath',
    FULL_PATH: 'fullpath',
    HEAD_DEVICE_NAME: 'HeadDeviceName',
    NG_HEAD_DEVICE: 'NGHeadDevice',
    NMO_BASE_NAME: 'NMO_BaseName',
    LEVEL_1: '1level',
    LEVEL_2: '2level',
    LEVEL_3: '3level'
  },

  // Разделитель для путей
  PATH_SEPARATOR: '\\',

  // Размер пакета для обновления записей
  BATCH_SIZE: 50,

  // Задержка между обновлениями (мс) для избежания перегрузки
  UPDATE_DELAY: 10
};
