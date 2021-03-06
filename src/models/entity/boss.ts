import * as Sequelize from 'sequelize';
import { Sequelize as SequelizeInterface } from 'sequelize';
import { ModelsInterface } from '../models';
import { GroupInstance } from './group';

export interface BossAttribute {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  channel_id: string;
  hash: string;
  lat: number;
  lng: number;
  location: string;
  gym_name: string;
  pokemon_id: number;
  start: Date;
}

export interface BossInstance extends Sequelize.Instance<BossAttribute>, BossAttribute {
  Groups: GroupInstance[];
  getGroups(): Promise<any>;
  addGroup(group: GroupInstance): Promise<any>;
}

export interface BossModel extends Sequelize.Model<BossInstance, BossAttribute> {
}

export function defineBoss<BossInstance, BossAttribute>(sequelize: SequelizeInterface) {
  const Boss = sequelize.define('Boss', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false },
    updated_at: { type: Sequelize.DATE },
    deleted_at: { type: Sequelize.DATE },
    channel_id: { type: Sequelize.BIGINT },
    hash: { type: Sequelize.STRING(255) },
    lat: { type: Sequelize.FLOAT },
    lng: { type: Sequelize.FLOAT },
    location: { type: Sequelize.STRING(255) },
    gym_name: { type: Sequelize.STRING(255) },
    pokemon_id: { type: Sequelize.INTEGER },
    start: { type: Sequelize.DATE }
  }, {
    tableName: 'bosses',
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {
      associate: (models: ModelsInterface) => {
        Boss.belongsTo(models.Channel, { foreignKey: 'channel_id' });
        Boss.hasMany(models.Group, { foreignKey: 'boss_id' });
      }
    }
  });
  return Boss;
}
