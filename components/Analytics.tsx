import React from 'react'
import ChartComponent from './Chartcomponent'

const Analytics = () => {
  return (
    <section className='p-2'>
        <div className="grid xl:grid-cols-2 justify-center items-center p-4 gap-5">
            <article className="shadow-md rounded-lg bg-white border border-gray-300 flex items-center justify-center p-5">
                <ChartComponent/>
            </article>
            <article className="shadow-md rounded-lg bg-white border border-gray-300 flex items-center justify-center p-5">
                <ChartComponent/>
            </article>
        </div>
    </section>
  )
}

export default Analytics