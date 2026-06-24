import {FileInput} from './FileInput';
import {FormatSelection} from './FormatSelection';
import './Content.css';

export function Content() {
    return (
        <div className="content">
            <p className='ad-text'>
                100% Free & Secure
                <br />
                No Ads, No Cookie Tracking
                <br />
                Hassle-free File Conversion
            </p>

            <hr className="wavy-hr"/>

            <form action="/conversion" method="POST" encType="multipart/form-data">

                <p className='heading'>Select your file type:</p>

                <FormatSelection />
                <FileInput />
                <button type="submit" className='convert-btn'>Convert</button>
            </form>


        </div>
    );
}