import './App.css'
import ImageUploader from './components/imageUploader';
import axios from 'axios';
import {Helmet} from "react-helmet";

function App() {

  const Url = "https://localhost:7080/api/Publicacao";

  const PubPost = async event => {
    event.preventDefault();
    const pubfile = new Blob([`<head><meta charset="UTF-8" /></head>` + document.getElementById('text-input').innerHTML], 
    {type: "text/plain"});
    const data = new FormData();
    data.append("title", document.getElementById('title').value);
    data.append("subtitle", document.getElementById('subtitle').value);
    data.append("img", document.getElementById('imageInput').files[0]);
    data.append("pub", pubfile);
    console.log(pubfile);
    for(var pair of data.entries()){
      console.log(pair[0]+ ',' + pair[1])
    }
    await axios.post(Url + "/SavePub", data, {
      onUploadProgress: (res) => {
        console.log(`${Math.round((res.loaded / res.total) * 100)}%`);
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Helmet>
              <script src="/assets/script.js" type="text/javascript" />
      </Helmet>
      <div className="container">
      <div className="Form">
        <input type="text" name="title" id="title" placeholder='Titulo da publicação' />
        <input type="text" name="subtitle" id="subtitle" placeholder='Subtitulo da publicação' />
        <label htmlFor="imageInput">Banner da publicação</label>
        <input type="file" name="imageInput" id="imageInput" />
      </div>
        <div className="options">
          <button id="bold" className="option-button btn-txtEdit format">
            <i className="fa-solid fa-bold"></i>
          </button>
          <span className='boldSpan'>Negrito</span>
          <button id="italic" className="option-button btn-txtEdit format">
            <i className="fa-solid fa-italic"></i>
          </button>
          <span className='italicSpan'>Itálico</span>
          <button id="underline" className="option-button btn-txtEdit format">
            <i className="fa-solid fa-underline"></i>
          </button>
          <span className='underlineSpan'>Sublinhado</span>
          <button id="strikethrough" className="option-button btn-txtEdit format">
            <i className="fa-solid fa-strikethrough"></i>
          </button>
          <span className='strikethroughSpan'>Tachado</span>
          <button id="superscript" className="option-button btn-txtEdit script">
            <i className="fa-solid fa-superscript"></i>
          </button>
          <span className='superscriptSpan'>Subscrito</span>
          <button id="subscript" className="option-button btn-txtEdit script">
            <i className="fa-solid fa-subscript"></i>
          </button>
          <span className='subscriptSpan'>Sobescrito</span>

          <button id="insertOrdenedList" className="option-button btn-txtEdit">
            <div className="fa-solid fa-list-ol"></div>
          </button>
          <span className='insertOrdenedSpan'>Lista ordenada</span>
          <button id="insertUnoderedList" className="option-button btn-txtEdit">
            <div className="fa-solid fa-list"></div>
          </button>
          <span className='insertUnoderedSpan'>Lista desordenada</span>

          <button id="undo" className="option-button btn-txtEdit">
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <span className='undoSpan'>Desfazer</span>
          <button id="redo" className="option-button btn-txtEdit">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <span className='redoSpan'>Refazer</span>

          <button id="createLink" className="adv-option-button btn-txtEdit">
            <i className="fa fa-link"></i>
          </button>
          <span className='createLinkSpan'>Inserir Link</span>
          <button id="unLink" className="option-button btn-txtEdit">
            <i className="fa fa-unlink"></i>
          </button>
          <span className='unLinkSpan'>Remover Link</span>

          <button id="insertImage" className="btn-txtEdit">
            <i className="fa-solid fa-image"></i>
          </button>
          <span className='insertImageSpan'>Inserir imagem</span>

          <dialog id="modalImg">
            <ImageUploader />
          </dialog>

          <button id="editHtml" className="btn-txtEdit">
            <i className="fa-solid fa-code"></i>
          </button>
          <span className='editHtmlSpan'>Editar código-fonte</span>

          <dialog id="modalHtml">
            <h1>Editor html</h1>
            <div id="html-input" contentEditable="true" cols="30"></div>
            <div className="buttonsHtmlEdit">
              <button id="Save">Salvar</button>
              <button id="Cancel">Cancelar</button>
            </div>
          </dialog>

          <button id="justifyLeft" className="option-button btn-txtEdit align active">
            <i className="fa-solid fa-align-left"></i>
          </button>
          <span className='justifyLeftSpan'>Alinhar à esquerda</span>
          <button id="justifyCenter" className="option-button btn-txtEdit align">
            <i className="fa-solid fa-align-center"></i>
          </button>
          <span className='justifyCenterSpan'>Centralizar</span>
          <button id="justifyRight" className="option-button btn-txtEdit align">
          <i className="fa-solid fa-align-right"></i>
          </button>
          <span className='justifyRightSpan'>Alinhar à direita</span>
          <button id="justifyFull" className="option-button btn-txtEdit align">
            <i className="fa-solid fa-align-justify"></i>
          </button>
          <span className='justifyFullSpan'>Justificar</span>
          <button id="indent" className="option-button btn-txtEdit spacing">
            <i className="fa-solid fa-indent"></i>
          </button>
          <span className='indentSpan'>Adicionar espaçamento</span>
          <button id="outdent" className="option-button btn-txtEdit spacing">
            <i className="fa-solid fa-outdent"></i>
          </button>
          <span className='outdentSpan'>Diminuir espaçamento</span>

          <select id="formatBlock" className="adv-option-button">
              <option value="p">Parágrafo</option>
              <option value="H1">Titulo 1</option>
              <option value="H2">Título 2</option>
              <option value="H3">Título 3</option>
              <option value="H4">Título 4</option>
              <option value="H5">Título 5</option>
              <option value="H6">Título 6</option>
          </select>

          <select id="fontName" className='adv-option-button'></select>
          <select id="fontSize" className='adv-option-button'></select>

          <div className="input-wrapper">
            <input type="color" id="foreColor" className='adv-option-button' />
            <label htmlFor="foreColor">Cor do texto</label>
          </div>
        </div>
        <div id="text-input" contentEditable="true" cols="30"></div>
        <div className="enviar">
          <input type="submit" value="Enviar" onClick={PubPost}/>
        </div>
      </div>
    </div>
  )
}

export default App