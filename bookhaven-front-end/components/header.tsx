import Image from "next/image";
import logo from '/public/logo.png';

export default function Header(){
    return <div className="flex bg-green-300 justify-between">
    <div>
    <ul className="flex justify-center text-xl">
            <li>
                Новинки
            </li>
            <li>
                Топ книги
            </li>
            <li>
                Передпродажі
            </li>
            <li>
                Акції
            </li>
            <li>
                Про нас
            </li>
            <li>
                Доставка
            </li>
        </ul>
    </div>
    <div className=""><p>Пн-Пт: 10:00-20:00 </p><span> | </span><p> Сб-Нд: 11:00-18:00</p></div>

    </div>
}