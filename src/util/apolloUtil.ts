/**
 *
 * @param fields array of field name that we need to create search like
 * @param value - string value that is going to be searched
 * @returns  object for sequelize or mondoDB
 *
 *    $or:[
 *        field1:{
 *             $like:'value'
 *        }
 *
 *    ]
 *
 */
export const _$like = (fields : string[], value : string) => {
  return {
    $or: fields.map((field : string) => ({
      [field]: {$like: value}
    }))
  }
}

export const _$opIn = (field : string, values : string[] | number[]) => {
  return {
    [field]: values
  }
}

export interface IFieldValue {
  field : string
  value : string | Date
}

export const _$and = (data : IFieldValue[]) => {
  return {
    $and: data.map((d : IFieldValue) => ({
      [d.field]: d.value
    }))
  }
}

export const _$OR = (data : IFieldValue[]) => {
  return {
    $or: data.map((d : IFieldValue) => ({
      [d.field]: d.value
    }))
  }
}

export const _$or = (fields : string[], value : string) => {
  return {
    $or: fields.map((field : string) => ({
      [field]: {
        $eq: value
      }
    }))
  }
}

export const _$gte = (data : IFieldValue) => {
  return {
    [data.field]: {
      $gte: data.value
    }
  }
}

