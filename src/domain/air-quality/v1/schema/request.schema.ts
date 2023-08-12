import * as Joi from 'joi';

export const nearbyCityAirQualitySchema = Joi.object().keys({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});
