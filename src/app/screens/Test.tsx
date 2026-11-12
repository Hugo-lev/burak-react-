// @ts-nocheck  ← TypeScript'ga "bu fayldagi xatolarni tekshirma" deydi
// (props va state'ga type yozmaganimiz uchun xato bermasligi uchun)
import React, { Component } from "react";

// Class component: React'ning eski usuli. `Component` dan meros oladi (extends)
class Test extends Component {
  // constructor — komponent yaratilganda BIRINCHI ishlaydi
  constructor(props) {
    super(props); // ota-class (Component) constructor'ini chaqirish SHART

    // state — komponent ichidagi o'zgaruvchan ma'lumotlar (boshlang'ich qiymatlar)
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  // Tugma bosilganda ishlaydigan funksiya (arrow function — shuning uchun `this` yo'qolmaydi)
  changeDetail = () => {
    // setState — state'ni yangilaydi va komponentni QAYTA chizadi (re-render)
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
    });
  };

  // LIFECYCLE (hayot sikli) metodlari:
  componentDidMount() {
    console.log("componentDidMount");
    // Birinchi render'dan KEYIN bir marta ishlaydi
    // => backend serverdan ma'lumot olish (fetch) shu yerda qilinadi
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // Komponent ekrandan O'CHIRILISHIDAN oldin ishlaydi
    // => tozalash ishlari (timer, listener'larni to'xtatish)
  }

  componentDidUpdate() {} // state/props o'zgarganda ishlaydi (hozircha bo'sh)

  // render — ekranga nima chiqishini aytadi (JSX qaytaradi)
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>
        {/* onClick bosilganda changeDetail ishga tushadi */}
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test; // boshqa fayllarda import qilish uchun
