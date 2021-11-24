import React from 'react'

export default function findTag(data){
    return data.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
