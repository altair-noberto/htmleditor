import './imageUploader.css'
import React from 'react'
import axios from 'axios'
import uploadImg from './image.svg'
import { Helmet } from 'react-helmet'

function imageUploader() {

  const baseUrl="https://localhost:7080/api/ImageFile/SaveImage"

  const handleFile = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("FormFile", e.target.files[0]);
    formData.append("Name", e.target.files[0].name);

    try{
      document.getElementById('main').classList.add('hidden');
      document.getElementById('loading').classList.remove('hidden')
      const res = await axios.post(baseUrl, formData, {
        onUploadProgress: (data) => {
          document.getElementById('progressBar').style.width = `${Math.round((data.loaded / data.total) * 100)}%`;
        }
      });
      if(res.status == 200){
        const imgSrc = `https://localhost:7080/Images/${res.data.name}`
        document.getElementById('loading').classList.add('hidden')
        document.getElementById('imgUploaded').src = imgSrc
        document.getElementById('imageLink').value = imgSrc
        document.getElementById('success').classList.remove('hidden');
      }
      else{
        console.log(res.status);
        console.log(res.name);
        document.getElementById('statusError').innerText = 'Falha na API';
        document.getElementById('loading').classList.add('hidden')
        document.getElementById('main').classList.remove('hidden');
      }
    }
    catch(ex){
      console.log(ex);
    }
  }

  function copyLink() {
    const Link = document.getElementById('imageLink')

    Link.select();
    Link.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(Link.value);
  }


  return (
    <div className="imgUpload">
      <Helmet>
              <script src="/assets/script.js" type="text/javascript" />
      </Helmet>
      <div className="loading hidden" id='loading'>
        <h2>Fazendo upload da imagem...</h2>
          <div className='loadingBar'>
            <div className="progressBar" id='progressBar'></div>
        </div>
      </div>
      <div className="containerModal" id='main'>
        <h1>Envie sua imagem</h1>
        <p id='statusError'>O arquivo precisa ser Png ou Jpeg</p>
        <div className="submitImg">
          <input type="file" accept="image/png, image/jpeg" name="file" id="file" className='InsertImg' onChange={handleFile} />
          <label htmlFor="file" className='labelImg'><img src={uploadImg} /><p>Clique ou arraste uma imagem aqui</p></label>
        </div>
        <p>Ou</p>
        <input type="file" name="imgBtn" id="imgBtn" onChange={handleFile} />
        <div className="textLink">
            <label htmlFor="imageLink">Insira o Link</label>
          <input type="text" name="imageLink" id="imgLinkInsert" />
        </div>
        <div className='imgSize'>
            <label htmlFor="height" className='labelName'>Altura: </label>
            <input type="text" name="height" id="imgHeightLink" />
            <label htmlFor="height">px</label>
            <label htmlFor="width" className='labelName'>Largura: </label>
            <input type="text" name="width" id="imgWidthLink" />
            <label htmlFor="width">px</label>
        </div>
        <p className="minimal">Deixe vazio para enviar o tamanho padrão.</p>
        <div className='buttons'>
            <button id='btnEnviarLink'>Enviar</button>
            <button id='btnCancel'>Cancelar</button>
        </div>
      </div>
      <div className="containerModal success hidden" id='success'>
        <h1>Enviada com sucesso</h1>
        <img src="" alt="ImageUploaded" id='imgUploaded' />
        <div className='imgSize'>
            <label htmlFor="height" className='labelName'>Altura: </label>
            <input type="text" name="height" id="imgHeight" />
            <label htmlFor="height">px</label>
            <label htmlFor="width" className='labelName'>Largura: </label>
            <input type="text" name="width" id="imgWidth" />
            <label htmlFor="width">px</label>
        </div>
        <p className="minimal">Deixe vazio para enviar o valor padrão.</p>
        <div className="textLink">
          <input type="text" name="imageLink" id="imageLink" readOnly={true} />
          <input type="button" value="Copy text" id='copyLink' onClick={copyLink} />
        </div>
        <button id='btnEnviar'>Enviar</button>
      </div>
    </div>
  )
}

export default imageUploader
