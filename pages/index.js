function HomePage() {
  return (
    <>
      <div className="site-container">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            Ben Adem ilter. İstanbul'da yaşayan Dijital Ürün Tasarımcısıyım.
          </h1>

          <p>
            Tasarım araçları, front-end teknolojileri, sokak fotoğrafçılığı ve
            tipografi gibi konularla yakından ilgileniyorum.
          </p>

          <p>
            Youtube kanalımda sektördeki eski teknoloji ve alışkanlıkları
            yenilerle değiştirmek için modern türkçe içerikler üretiyorum.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-20">
        <img src="/i-am.jpeg" alt="" />
      </div>
    </>
  )
}

export default HomePage
