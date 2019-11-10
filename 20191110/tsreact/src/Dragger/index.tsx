import React,{useRef,MutableRefObject,RefObject, useEffect, useState, ReactNode} from 'react';
import './index.css';
import {Progress,Icon} from 'antd';
export type DragProps=React.PropsWithChildren<{
    onUpload:any,
    name:string,
    action:string
}>

export interface UploadFile{
    file:File,
    error?: boolean;
    uploading?: boolean;
    percent?:number,
    url?:string
}

const Dragger:React.SFC<DragProps>=function(props:DragProps):JSX.Element{
    let [uploadFiles,setUploadFiles]=useState<Array<UploadFile>>([])
    let uploadContainer:MutableRefObject<HTMLDivElement | undefined>=useRef<HTMLDivElement | undefined>();
    const onDragEnter:(ev:DragEvent)=>any=(ev:DragEvent):any=>{
        // 阻止默认事件
        ev.preventDefault();
        ev.stopPropagation();
    }
    const onDragOver:(ev:DragEvent)=>any=(ev:DragEvent):any=>{
        // 阻止默认事件
        ev.preventDefault();
        ev.stopPropagation();
    }
    const onDragLeave:(ev:DragEvent)=>any=(ev:DragEvent):any=>{
        // 阻止默认事件
        ev.preventDefault();
        ev.stopPropagation();
    }
    const onDrop:(ev:DragEvent)=>any=(ev:DragEvent):any=>{
        // 阻止默认事件
        ev.preventDefault();
        ev.stopPropagation();
        let transfer:DataTransfer | null=ev.dataTransfer;
        if(transfer && transfer.files){
            upload(transfer.files);
        }
    }
    function upload(files:FileList){
        for(let i=0;i<files.length;i++){
            let file=files[i];
            let formData=new FormData();
            formData.append('filename',file.name);
            formData.append(props.name,file);
            let xhr:XMLHttpRequest=new XMLHttpRequest();
            xhr.open('POST',props.action,true);
            xhr.responseType='json';
            let uploadFile:UploadFile={file,percent:0,uploading:true,error:false};
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status===200){
                    uploadFile.url=xhr.response.url;
                    props.onUpload(uploadFile);
                }
            }
            uploadFiles.push(uploadFile);
            xhr.onprogress=updateProgress;
            xhr.upload.onprogress=updateProgress;
            function updateProgress(event:ProgressEvent){
                if(event.lengthComputable){
                    let percent:number =parseInt((event.loaded/event.total*100).toFixed(0));
                    uploadFile.percent=percent;
                    if(percent>=100){
                        uploadFile.uploading=false;
                    }
                    setUploadFiles([...uploadFiles])
                }
            }
            xhr.onerror=function(){
                uploadFile.error=true;
                uploadFile.uploading=false;
                setUploadFiles([...uploadFiles]);
            }
            xhr.ontimeout=function(){
                uploadFile.error=true;
                uploadFile.uploading=false;
                setUploadFiles([...uploadFiles]);
            }
            xhr.send(formData);
        }
    }
    // useEffect中的函数会在组件挂载完成，真实dom挂载完成后执行，或者更新完成后执行
    useEffect(()=>{
        uploadContainer.current!.addEventListener('dragenter',onDragEnter);
        uploadContainer.current!.addEventListener('dragover',onDragEnter);
        uploadContainer.current!.addEventListener('dragleave',onDragEnter);
        uploadContainer.current!.addEventListener('drop',onDragEnter);
        return ()=>{
            uploadContainer.current!.removeEventListener('dragenter',onDragEnter);
            uploadContainer.current!.removeEventListener('dragover',onDragEnter);
            uploadContainer.current!.removeEventListener('dragleave',onDragEnter);
            uploadContainer.current!.removeEventListener('drop',onDragEnter);
        }
    })
    return (
        <>
            <div className='dragger-container' ref={uploadContainer as RefObject<HTMLDivElement> | null | undefined}>
                {props.children}
            </div>
            {
                uploadFiles.map((uploadFile:UploadFile,index:number)=>{
                    <div key={index}>
                        <div>
                            {!uploadFile.error && <Icon type={uploadFile.uploading ? 'loading' : 'paper-clip'} />}
                            <span style={{marginLeft:10}}{...uploadFile.file.name}></span>
                        </div>
                        <Progress status={uploadFile.error ? 'exception' : undefined} key={index} percent={uploadFile.percent} />
                    </div>
                })
            }
        </>
    )
}
export default Dragger;