import * as Joi from 'joi';

export const nearbyCityAirQualitySchema = Joi.object().keys({
  latitude: Joi.number().min(0).required(),
  longitude: Joi.number().min(0).required(),
});
