'use client';
export default function Contact() {
  return (
    <>
      <main className="pt-28 pb-14 bg-black/50">
        <div className=" md:px-16">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center px-4">
            <h3 className="text-gray-400 font-semibold">Contact</h3>
            <p className="text-white text-3xl font-semibold sm:text-4xl drop-shadow-md">
              Get in Touch
            </p>
            <p className="text-gray-300">
              We’d love to hear from you! Please fill out the form below.
            </p>
          </div>

          {/* Karta Formularza w stylu Frosted Glass */}
          <div
            className="mt-12 max-w-lg mx-auto p-8 md:p-10 
                                 backdrop-blur-md bg-black/50 border border-white/20 rounded-xl shadow-2xl"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-100 bg-white/5 outline-none border border-white/20 focus:border-white/80 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-gray-200">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-100 bg-white/5 outline-none border border-white/20 focus:border-white/80 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-200">Email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-100 bg-white/5 outline-none border border-white/20 focus:border-white/80 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-gray-200">
                  Phone Number
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r border-white/20 pr-2">
                    <select
                      // ZMIANA: Dodano bg-transparent i usunięto bg-black/80
                      className="text-sm text-gray-200 outline-none h-full bg-transparent border-none appearance-none"
                    >
                      {/* Opcje nadal mają ciemne tło (bg-black/80), aby rozwijana lista była ciemna */}
                      <option className="text-white bg-black/80">US</option>
                      <option className="text-white bg-black/80">PL</option>
                      <option className="text-white bg-black/80">ES</option>
                      <option className="text-white bg-black/80">MR</option>
                    </select>
                  </div>

                  <input
                    type="tel"
                    placeholder="+1 (555) 000-000"
                    required
                    // Klasy ukrywające strzałki są prawidłowe
                    className="w-full pl-[4.5rem] pr-3 py-2 
                                                 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none 
                                                 text-gray-100 bg-white/5 outline-none border border-white/20 focus:border-white/80 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-200">Message</label>
                <textarea
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none 
                                         text-gray-100 bg-white/5 outline-none border border-white/20 focus:border-white/80 shadow-sm rounded-lg"
                ></textarea>
              </div>
              <button className="w-full px-4 py-3 text-black font-semibold bg-white hover:bg-gray-200 active:bg-white rounded-lg duration-150 shadow-xl hover:shadow-white/50">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
