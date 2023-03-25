function Zone({ zone, tariff }) {
    return (
        <div className='bg-slate-500 rounded text-center text-white font-bold	'>
            <h4>{zone}</h4>
            <div>{tariff} p/min</div>
        </div>
    );
  }
  
  export default Zone;